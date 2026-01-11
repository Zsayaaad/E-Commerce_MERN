import { Router } from "express";
import { getActiveCart } from "../services/cartServices";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const userId = (req as any).user.userId;

  const activeCart = await getActiveCart({ userId });

  res.status(200).send(activeCart);
});

export default router;
