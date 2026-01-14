import { Router } from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  getActiveCart,
  removeItemfromCart,
  updateQuantityOfCartItem,
} from "../services/cart/cartServices";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthRequest } from "../types/extendedRequest";

const router = Router();

// GET cart
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.userId;

    const activeCart = await getActiveCart({ userId });

    res.status(200).send(activeCart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Items to cart
router.post("/items", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).send("productId and quantity are required");
    }

    const response = await addItemToCart({ userId, productId, quantity });

    res.status(response.statusCode).send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update item quantity in cart
router.put("/items", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).send("productId and quantity are required");
    }

    const response = await updateQuantityOfCartItem({
      userId,
      productId,
      quantity,
    });

    res.status(response.statusCode).send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete item from the cart
router.delete(
  "/items/:productId",
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      const userId = req.user.userId;
      const { productId } = req.params;

      if (!productId) {
        return res.status(400).send("productId is required");
      }

      const response = await removeItemfromCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Clear all items from cart
router.delete("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.userId;

    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Checkout from cart
router.post("/checkout", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.userId;
    const { address } = req.body;

    if (!address) {
      return res.status(400).send("Address is required");
    }

    const response = await checkout({ userId, address });

    res.status(response.statusCode).send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
