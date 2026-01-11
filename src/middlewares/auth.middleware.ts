import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth/jwt";
import { JwtPayload } from "jsonwebtoken";

interface JwtPayloadCustom {
  userId: string;
}
export interface AuthRequest extends Request {
  user?: JwtPayloadCustom | string | JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Authrization header missing!");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Invalid token format");
  }

  try {
    const decodedToken = verifyToken(token);
    // { userId: '695f993be8e343ac451ac205', iat: 1768141168 }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};
