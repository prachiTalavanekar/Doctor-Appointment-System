// import jwt from 'jsonwebtoken'

// // doctor authentication middleware
// const authDoctor = async (req, res, next) => {
//   try {
//     // ✅ Read from Authorization: Bearer <token>
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.json({ success: false, message: 'Not Authorized Login Again' });
//     }

//     const dtoken = authHeader.split(" ")[1];

//     // const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     // req.body.userId = token_decode.id
//     // next();

//     const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
//     req.docId = token_decode.id;
//     next();

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//     console.log('VERIFY SECRET:', process.env.JWT_SECRET);
//     console.log('TOKEN:', dtoken);

//   }
// }

// export default authDoctor




// backend/middlewares/authDoctor.js
import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
    }

    const dtoken = authHeader.split(" ")[1];
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.docId = token_decode.id;
    next();
  } catch (error) {
    console.error("authDoctor error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authDoctor;

