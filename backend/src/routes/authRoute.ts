import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { login, register, logout } from "../controllers/authController.js";

const router = express.Router();

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // Attach decoded user data to request
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

//  Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

export default router;
