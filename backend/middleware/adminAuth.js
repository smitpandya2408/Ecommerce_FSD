import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized, login again (no token)",
      });
    }

    // Verify token and store result in a variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded token has the correct admin email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not authorized, login again (invalid email)",
      });
    }

    // All good
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
