import userModel from "../../models/userModel";
import bcrypt from "bcrypt";
import { generateJWT } from "../../auth/jwt";
import { LoginParams, RegisterParams } from "./interfaces";


export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "This email is already exist!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return {
    data: generateJWT({ userId: newUser._id.toString() }),
    statusCode: 200,
  };
};

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect email or password!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return {
      data: generateJWT({
        userId: findUser._id.toString(),
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect email or password!", statusCode: 400 };
};
