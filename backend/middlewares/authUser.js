import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    // ✅ Read from Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    const token = authHeader.split(" ")[1];

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;
    next();

  } catch (error) {
    console.log(`JWT Error: ${error.message}`);
    res.json({ success: false, message: 'Not Authorized. Please login again.' });
  }
}

export default authUser

