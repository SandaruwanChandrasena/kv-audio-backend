import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
    default: "uncategorized",
  },

  description: {
    type: String,
    required: true,
  },
  dimentions: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
  productImage: {
    type: String,
    required: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqlHgMZnDsNi2mrQn4Ih_QfDe_k8K29uiuA&s",
  },
});

const Product = mongoose.model("products", productSchema);

export default Product;
