// import jwt from 'jsonwebtoken'

// // admin authentication middleware
// const authAdmin = async (req, res, next) => {
//     try {
//         const { atoken } = req.headers
//         if (!atoken) {
//             return res.json({ success: false, message: 'Not Authorized Login Again' })
//         }

//         const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: 'Not Authorized Login Again' })
//         }

//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// export default authAdmin









import jwt from 'jsonwebtoken'

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    // ✅ Read from Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    const token = authHeader.split(" ")[1];
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Ensure only the correct admin can access
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    req.admin = token_decode;
    next();
  } catch (error) {
    console.log(`Admin Auth Error: ${error.message}`);
    res.json({ success: false, message: 'Not Authorized. Please login again.' });
  }
}

export default authAdmin;

