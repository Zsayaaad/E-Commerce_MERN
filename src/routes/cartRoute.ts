import { Router } from "express";
import { getActiveCart } from "../services/cartServices";

const router = Router();

router.get("/", async (req, res) => {
  // TO DO: GET USERID FROM THE JWT, AFTER VALIDATING BY MIDDLEWARE
  const activeCart = await getActiveCart({ userId: "xxx" });
  res.status(200).send(activeCart);
});
