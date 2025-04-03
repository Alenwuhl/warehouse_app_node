import { getCartById } from "../controllers/cart.controller";

export default class CartsService {
  getCarts = async () => {
    try {
      const carts = await this.find();
      return carts;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching carts" };
    }
  };
  getCartById = async (id) => {
    try {
      const cart = await this.findById(id);
      return cart;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching cart by ID" };
    }
  };
  createCart = async (cartData) => {
    try {
      const newCart = await this.create(cartData);
      return newCart;
    } catch (error) {
      console.error(error);
      return { error: "Error creating cart" };
    }
  };
}
updateCart = async (id, cartData) => {
  try {
    const updatedCart = await this.findByIdAndUpdate(id, cartData, {
      new: true,
    });
    return updatedCart;
  } catch (error) {
    console.error(error);
    return { error: "Error updating cart" };
  }
};
deleteCart = async (id) => {
  try {
    const deletedCart = await this.findByIdAndDelete(id);
    return deletedCart;
  } catch (error) {
    console.error(error);
    return { error: "Error deleting cart" };
  }
};
getCartByStatus = async (status) => {
  try {
    const carts = await this.find({ status });
    return carts;
  } catch (error) {
    console.error(error);
    return { error: "Error fetching carts by status" };
  }
};
getCartByProductId = async (productId) => {
  try {
    const carts = await this.find({ product: productId });
    return carts;
  } catch (error) {
    console.error(error);
    return { error: "Error fetching carts by product id" };
  }
};
