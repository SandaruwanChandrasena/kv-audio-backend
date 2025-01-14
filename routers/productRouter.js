import express from "express";
import { addProduct, getProduct } from "../controllers/productCtrl.js";

const productRouter = express.Router();

productRouter.post("/", addProduct);
productRouter.get("/", getProduct);

export default productRouter;