import Product from "../models/product.js";

export function addProduct(req, res) {
  console.log(req.user);

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
    .then(() => {
      res.json({
        message: "Product added successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Product adding error",
      });
    });
}
