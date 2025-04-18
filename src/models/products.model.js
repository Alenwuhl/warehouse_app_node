import mongoose from "mongoose";


const productSchemma = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["weapons", "clothing", "electronics", "other"],
  },
  stock: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Working product", "Defective product"],
  },
};

const Product = mongoose.model("Product", productSchemma);

export default Product;