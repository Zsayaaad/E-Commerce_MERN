import express from "express";
import {
  getOrdersByUserId,
  login,
  register,
} from "../services/user/userServices";
import { AuthRequest } from "../types/extendedRequest";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, statusCode } = await login({ email, password });

    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/orders", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.userId;

    // Fetch orders for the user
    const { data: orders, statusCode } = await getOrdersByUserId(userId);

    res.status(statusCode).json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
