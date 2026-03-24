// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'

// // app config
// const app =express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// // middlewares
// app.use(express.json())
// app.use(cors())

// // api endpoints
// app.use('/api/admin',adminRouter)
// //localhost:4000/api/admin/add-doctor


// app.get('/',(req,res)=>{
// res.send('API is working properly..❤️')
// })

// app.listen(port,()=> console.log("server started on port ➡️ ",port))


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import chatbotRouter from './routes/chatbotRoute.js';
import translateRoute from './routes/translateRoute.js'


// App config
dotenv.config();
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: (process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL) ? process.env.FRONTEND_URL : '*',
    methods: ['GET', 'POST']
  }
});
connectDB();
connectCloudinary();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamic CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  process.env.ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user', userRouter)
app.use('/api/chatbot', chatbotRouter)
app.use('/api/chatbot', translateRoute);
app.use('/api', translateRoute); // 👈 This makes /api/translate available


app.get('/', (req, res) => {
  res.send('API is working properly..❤️');
});

// Socket.IO signaling for video calls
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-room', ({ roomId, role }) => {
    console.log('User joined room:', roomId, 'Role:', role);
    socket.join(roomId);
    socket.to(roomId).emit('peer-joined', { socketId: socket.id, role });
  });

  socket.on('signal', ({ roomId, data, to }) => {
    if (to) {
      io.to(to).emit('signal', { from: socket.id, data });
    } else {
      socket.to(roomId).emit('signal', { from: socket.id, data });
    }
  });

  socket.on('end-call', ({ roomId }) => {
    console.log('Call ended for room:', roomId);
    // Broadcast to all clients in the room that the call has ended
    io.to(roomId).emit('call-ended');
    // Also leave the room
    socket.leave(roomId);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => console.log(`Server started on port ➡️  ${port}`));
