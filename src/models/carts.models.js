import mongoose from 'mongoose';

const CartItemSchema = {
  productId: { type: String, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
};

const CartSchema = {
  items: [CartItemSchema],
  orderNumber: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  unitId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "completed"],
  }
};

const Carts = mongoose.model('Cart', CartSchema);

export default Carts 