import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  let token = req.header("Authorization");

  if (token != null) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, "ruwan", (err, decoded) => {
      if (!err) {

        req.user = decoded;

      }
    });
  }

  next();
});

const mongoURL =
  "mongodb+srv://ruwan_test:ruwan123@cluster0.krhc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb Database connected Successfully");
});

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.listen(3000, () => {
  console.log("Server is running port 3000");
});
