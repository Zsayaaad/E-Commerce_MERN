import { cartModel, ICartItem } from "../../models/cartModel";
import { IOrderItem, orderModel } from "../../models/orderModel";
import productModel from "../../models/productModel";
import {
  AddItemToCart,
  Checkout,
  ClearCart,
  CreateCart,
  GetActiveCart,
  RemoveItemFromCart,
  UpdateQuantityOfCartItem,
} from "./interfaces";

const createCart = async ({ userId }: CreateCart) => {
  const cart = await cartModel.create({ userId });
  return cart;
};

export const getActiveCart = async ({ userId }: GetActiveCart) => {
  let activeCart = await cartModel.findOne({ userId, status: "active" });

  if (!activeCart) {
    activeCart = await createCart({ userId });
  }

  return activeCart;
};

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
 * - validate if product exists
 * - validate if the item already exists in the cart
 * - validate if sufficient stock is available
 * - add the item to the cart
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
  try {
    const cart = await getActiveCart({ userId });

    // Validate product existence
    const product = await productModel.findById(productId);
    if (!product) {
      return { data: "Product not found", statusCode: 404 };
    }

    // Check if item already exists in the cart
    const existInCart = cart.items.find((item) => {
      return item.product.toString() === productId;
    });
    if (existInCart) {
      return { data: "Item already exists in the cart", statusCode: 400 };
    }

    // Validate stock availability
    if (product.stock < quantity) {
      return { data: "Insufficient stock for the product", statusCode: 400 };
    }

    cart.items.push({ product, quantity, unitPrice: product.price });

    // Update total amount
    cart.totalAmount += product.price * quantity;

    await cart.save();
    return { data: cart, statusCode: 200 };
  } catch (error) {
    return { data: error, statusCode: 500 };
  }
};

/**
 * Name: updateQuantityOfCartItem
 *
 * Inputs:
 * - userId: string
 * - productId: string
 * - quantity: number
 *
 * Processes:
 * - fetch tha cart from DB by calling getActiveCart
 * - validate if the item exists in cart
 * - validate if sufficient stock is available from the new quantity
 * - remove the old price of the item from totalAmount (cart.unitPrice * cart.quantity)
 * - update the quantity of the item in cart by the new quantity
 * - add the new price of the item to 'totalAmount' (newPrice= cart.unitPrice * new quantity)
 * - save the cart
 *
 * Outputs:
 * - updated cart object
 */
export const updateQuantityOfCartItem = async ({
  userId,
  productId,
  quantity,
}: UpdateQuantityOfCartItem) => {
  try {
    const cart = await getActiveCart({ userId });

    const itemInCart = cart.items.find((item) => {
      return item.product.toString() === productId;
    });
    if (!itemInCart) {
      return { data: "Item not found in cart", statusCode: 404 };
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return { data: "Product not found", statusCode: 404 };
    }
    if (quantity > product.stock) {
      return { data: "Insufficient stock for the product", statusCode: 400 };
    }

    // Remove the old price of the item from totalAmount
    cart.totalAmount -= itemInCart.unitPrice * itemInCart.quantity;
    // Update the quantity & unitPrice
    itemInCart.quantity = quantity; // new quantity
    // Add the new price of the item to totalAmount
    cart.totalAmount += itemInCart.unitPrice * quantity; // new price

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
  } catch (error) {
    return { data: error, statusCode: 500 };
  }
};

/**
 * Name: removeItemFromCart
 *
 * Inputs:
 * - userId: string
 * - productId: string
 *
 * Processes:
 * - fetch cart from DB
 * - validate if item exists in cart
 * - update totalAmount by removing the price of the item from it
 * - remove the the item from items in the cart
 */
export const removeItemfromCart = async ({
  userId,
  productId,
}: RemoveItemFromCart) => {
  try {
    const cart = await getActiveCart({ userId });

    const itemInCart: ICartItem | undefined = await cart.items.find((item) => {
      return item.product.toString() === productId;
    });

    if (!itemInCart) {
      return { data: "Item not found in cart", statusCode: 404 };
    }

    cart.totalAmount -= itemInCart.unitPrice * itemInCart.quantity;
    // filtering the deleted item from items array in cart
    const otherCartItems: ICartItem[] = cart.items.filter((item) => {
      item.product.toString() !== productId;
    });

    cart.items = otherCartItems;

    const updatedCart = await cart.save();

    return { data: updatedCart, statusCode: 200 };
  } catch (error) {
    return { data: error, statusCode: 500 };
  }
};

/**
 * Name: clearCart
 *
 * Inputs:
 * - userId: string
 *
 * Processes:
 * - fetch cart from DB
 * - assign empty array to cart.items
 * - put zero to totalAmount
 * - save cart
 *
 */
export const clearCart = async ({ userId }: ClearCart) => {
  try {
    const cart = await getActiveCart({ userId });

    cart.items = [];
    cart.totalAmount = 0;

    const emptyCart = await cart.save();

    return { data: emptyCart, statusCode: 200 };
  } catch (error) {
    return { data: error, statusCode: 500 };
  }
};

/**
 * Name: checkout
 *
 * Inputs:
 * - userId: string
 * - address: string
 *
 * Processes:
 * - fetch cart from DB by userId
 * - create orderItems
 * - loop on cart.items to get each item
 * - push each item in orderItems
 *
 * - get our order by making orderModel that will take it's object(userId, orderItems, total, address)
 * - save the order in DB
 * - update status of cart to be 'completed'
 *
 * Output:
 * - order object
 */
export const checkout = async ({ userId, address }: Checkout) => {
  try {
    const cart = await getActiveCart({ userId });

    const orderItems: IOrderItem[] = [];
    for (const item of cart.items) {
      const product = await productModel.findById(item.product);
      if (!product) {
        return { data: "Product not found!", statusCode: 404 };
      }

      const orderItem: IOrderItem = {
        productTitle: product.title,
        productQuantity: item.quantity,
        productPrice: item.unitPrice,
        productImage: product.imageUrl,
      };

      orderItems.push(orderItem);
    }

    const order = await orderModel.create({
      userId,
      address,
      orderItems,
      total: cart.totalAmount,
    });

    cart.status = "completed";
    await cart.save();

    return { data: order, statusCode: 200 };
  } catch (error) {
    return { data: error, statusCode: 500 };
  }
};
