import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import cartRoute from "./routes/cartRoute";
import productsRoute from "./routes/productsRoute";
import { seedInitialProducts } from "./services/products/productServices";
import cors from "cors";

dotenv.config();

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (!req.body) req.body = {};
  next();
});

mongoose
  .connect(process.env.DATABASE_URL || "")
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
