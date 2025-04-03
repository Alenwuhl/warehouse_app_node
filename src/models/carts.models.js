const cartSchemma = {
  products: {
    type: Array,
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
