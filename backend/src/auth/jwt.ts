import jwt, { JwtPayload } from "jsonwebtoken";

const getSecretKey = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return process.env.JWT_SECRET;
};

export const generateJWT = (payload: object) => {
  // console.log("Payload: ", payload);

  return jwt.sign(payload, getSecretKey());
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, getSecretKey());
};
