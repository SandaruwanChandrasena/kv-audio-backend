import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routers/reviewRouter.js";
import inquiryRouter from "./routers/inquiryRouter.js";
import cors from "cors";


dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  let token = req.header("Authorization");

  if (token != null) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
    });
  }

  next();
});

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(mongoUrl);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb Database connected Successfully");
});

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/reviews", reviewRouter);

app.use("/api/inquiries", inquiryRouter);

app.listen(port, () => {
  console.log("Server is running port 3000");
});
