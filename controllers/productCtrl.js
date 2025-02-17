import Product from "../models/product.js";
import { isItAdmin } from "./userCtrl.js";

export function addProduct(req, res) {
  if (req.user == null) {
    res.status(401).json({
      message: "Please login first and try again",
    });
    return;
  }

  if (req.user.role != "admin") {
    res.status(403).json({
      message: "Sorry! your not authorized to do this",
    });
  }

  const newProduct = req.body;
  const product = new Product(newProduct);

  product
    .save()
    .then((result) => {
      res.json({
        message: "Product added successfully",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Product adding error",
        error: error.message,
      });
    });
}

export async function getProduct(req, res) {
  try {
    if (isItAdmin(req)) {
      const products = await Product.find();
      res.json(products);

      return;
      
    } else {
      const products = await Product.find({
        availability: true,
      });

      res.json({
        products,
      });

      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Faield to get products",
    });
  }
}

export async function updateProduct(req, res) {
  try {
    if (isItAdmin(req)) {
      const key = req.params.key;

      const data = req.body;

      await Product.updateOne({ key: key }, data);

      const updateProduct = await Product.findOne({ key: key });

      res.json({
        message: "Product is updated Successfully",
        Product: updateProduct,
      });

      return;
    } else {
      res.status(403).json({
        message: "You are not authorized to do this activity",
      });
    }
  } catch (error) {
    res.json({
      message: "Faield to update product",
      error: error.message,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    if (isItAdmin(req)) {
      const key = req.params.key;
      
      const deleteProduct = await Product.findOne({ key: key });
      await Product.deleteOne({ key: key });


      res.json({
        message: "Product deleted Successfully",
        Product: deleteProduct,
      });
    } else {
      res.status(403).json({
        message: "You are not authorized to do this activity",
      });
    }
  } catch (error) {
    res.json({
      message: "Faild to delete the product",
      error: error.message,
    });
  }
}
