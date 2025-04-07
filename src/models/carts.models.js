import mongoose from "mongoose";

const cartSchemma = {
  products: {
    type: Array,
    foreignKey: "products",
    ref: "products",
    required: true,
    default: [],
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "send", "completed"],
  },
};
const Cart = mongoose.model("Cart", cartSchemma);
export default Cart;
