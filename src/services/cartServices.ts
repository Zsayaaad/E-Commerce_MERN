import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCart {
  userId: string;
}

const createCart = async ({ userId }: CreateCart) => {
  const cart = await cartModel.create({ userId });

  return cart;
};

interface GetActiveCart {
  userId: string;
}

export const getActiveCart = async ({ userId }: GetActiveCart) => {
  let activeCart = await cartModel.findOne({ userId, status: "active" });

  if (!activeCart) {
    activeCart = await createCart({ userId });
  }

  return activeCart;
};

interface AddItemToCart {
  userId: string;
  productId: string;
  quantity: number;
}

/**
 * Name: addItemToCart
 *
 * Inputs:
 * - userId: string
 * - productId: string
 * - quantity: number
 *
 * Processes:
 * - fetch the cart from DB by calling getActiveCart
 * - check if the item already exists in the cart
 * -- if exists, return an error
 * -- if not, add the item to the cart
 * - update totalAmount for the cart
 * - save the cart
 *
 * Outputs:
 * - updated cart object
 */
export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  const cart = await getActiveCart({ userId });

  const existInCart = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existInCart) {
    return { data: "Item already exists in the cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { data: "Insufficient stock for the product", statusCode: 400 };
  }

  cart.items.push({ product, quantity, unitPrice: product.price });

  cart.totalAmount += product.price * quantity;

  await cart.save();
  return { data: cart, statusCode: 200 };
};
