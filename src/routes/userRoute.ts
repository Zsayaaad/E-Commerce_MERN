import express from "express";
import { login, register } from "../services/user/userServices";

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

    res.status(statusCode).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, statusCode } = await login({ email, password });

    res.status(statusCode).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
