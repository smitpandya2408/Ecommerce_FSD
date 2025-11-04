// middleware/auth.js
import jwt from "jsonwebtoken";

const authuser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, please login again",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.error("User Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized, please login again",
    });
  }
};

export default authuser;
