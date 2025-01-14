import Product from "../models/product.js";

export function addProduct(req, res) {
  // console.log(req.user);

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
  let isAdmin = false;

  if (req.user != null) {
    if (req.user.role == "admin") {
      isAdmin = true;
    }
  }

  try {
    if (isAdmin) {
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
