import { Router } from "express";
import {
  addItemToCart,
  getActiveCart,
  updateQuantityOfCartItem,
} from "../services/cartServices";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthRequest } from "../types/extendedRequest";

const router = Router();

// GET cart
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user.userId;

  const activeCart = await getActiveCart({ userId });

  res.status(200).send(activeCart);
});

// Add Items to cart
router.post("/items", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).send("productId and quantity are required");
  }

  const response = await addItemToCart({ userId, productId, quantity });

  res.status(response.statusCode).send(response.data);
});

// Update item quantity in cart
router.put("/items", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  console.log(productId, quantity);

  if (!productId || !quantity) {
    return res.status(400).send("productId and quantity are required");
  }

  const response = await updateQuantityOfCartItem({
    userId,
    productId,
    quantity,
  });

  res.status(response.statusCode).send(response.data);
});
export default router;
