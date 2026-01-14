import { model, ObjectId, Schema, Document } from "mongoose";

export interface IOrderItem {
  productTitle: string;
  productQuantity: number;
  productPrice: number;
  productImage: string;
}

const orderItemSchema = new Schema<IOrderItem>({
  productTitle: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, required: true },
});

export interface IOrder extends Document {
  userId: ObjectId | string;
  orderItems: IOrderItem[];
  total: number;
  address: string;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [orderItemSchema],
  total: { type: Number, required: true },
  address: { type: String, required: true },
});

export const orderModel = model<IOrder>("Order", orderSchema);
