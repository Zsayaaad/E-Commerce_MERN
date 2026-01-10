import jwt from "jsonwebtoken";

const getSecretKey = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return process.env.JWT_SECRET;
};

export const generateJWT = (payload: object) => {
  return jwt.sign(payload, getSecretKey());
};

export const verifyToken = () => {};
