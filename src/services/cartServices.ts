import { cartModel } from "../models/cartModel";

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
