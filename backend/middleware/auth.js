import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {
  try {
    // ✅ Read token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not authorized, login again" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id; // attach userId for controller
    next();
  } catch (error) {
    console.error("User Auth Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authuser;
