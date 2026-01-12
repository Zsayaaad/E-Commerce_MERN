import { model, ObjectId, Schema } from "mongoose";
import { IProduct } from "./productModel";

interface ICartItem {
  quantity: number;
  product: IProduct;
  unitPrice: number;
}

export interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItem[];
  status: "active" | "completed";
  totalAmount: number;
}

const cartItemSchema = new Schema<ICartItem>({
  quantity: { type: Number, required: true, default: 1 },
  product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  status: { type: String, enum: ["active", "completed"], default: "active" },
  totalAmount: { type: Number, required: true, default: 0 },
});

export const cartModel = model<ICart>("Cart", cartSchema);
