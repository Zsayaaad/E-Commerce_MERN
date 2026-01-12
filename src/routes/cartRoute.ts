import { Router } from "express";
import { addItemToCart, getActiveCart } from "../services/cartServices";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthRequest } from "../types/extendedRequest";

const router = Router();

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user.userId;

  const activeCart = await getActiveCart({ userId });

  res.status(200).send(activeCart);
});

router.post("/items", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  const response = await addItemToCart({ userId, productId, quantity });

  res.status(response.statusCode).send(response.data);
});

export default router;
