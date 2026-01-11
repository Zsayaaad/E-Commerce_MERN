import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import cartRoute from "./routes/cartRoute";

import { seedInitialProducts } from "./services/productServices";
import productsRoute from "./routes/productsRoute";

const port = 5000;
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("Failed to connect!", err));

// Seed products to DB
seedInitialProducts();

app.use("/user", userRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);

app.listen(port, () =>
  console.log(`Server is running at: http://localhost:${port}`)
);
