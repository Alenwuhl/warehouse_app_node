import Carts from "../models/carts.models.js";
import * as unitsController from "../controllers/units.controller.js";
import ProductService from "./products.service.js";

export default class CartsService {
  getCarts = async () => {
    try {
      const carts = await Carts.find();
      return carts;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching carts" };
    }
  };
  getCartById = async (id) => {
    try {
      const cart = await Carts.findById(id);
      return cart;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching cart by ID" };
    }
  };
  getCartByUserId = async (userId) => {
    try {
      const cart = await Carts.findOne({ user: userId });
      return cart;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching cart by user ID" };
    }
  }
  createCart = async (cartData) => {
    try {
      const newCart = await Carts.create(cartData);
      return newCart;
    } catch (error) {
      console.error(error);
      return { error: "Error creating cart" };
    }
  };
  updateCart = async (id, cartData) => {
    try {
      const updatedCart = await Carts.findByIdAndUpdate(id, cartData, {
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
      const deletedCart = await Carts.findByIdAndDelete(id);
      return deletedCart;
    } catch (error) {
      console.error(error);
      return { error: "Error deleting cart" };
    }
  };
  getCartByStatus = async (status) => {
    try {
      const carts = await Carts.find({ status });
      return carts;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching carts by status" };
    }
  };
  getCartByProductId = async (productId) => {
    try {
      const carts = await Carts.find({ product: productId });
      return carts;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching carts by product id" };
    }
  };
  addProductToCart = async (cartId, productId, quantity, price) => {
    try {
      const cart = await Carts.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const productService = new ProductService();
      const product = await productService.verifyProduct(productId, quantity);
      cart.products.push(product.productId, product.quantity, product.price);
      // cart.totalPrice += quantity * price;
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
      return { error: "Error adding product to cart" };
    }
  };
  finishCart = async (cartId) => {
    try {
      const cart = await Carts.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const unitBudget = await Unit.returnUnitBudget(cart.user);
      if(unitBudget.budget < cart.totalPrice){
        throw new Error("Not enough budget");
      }
      cart.status = "completed";
      console.log("Your order has been completed");
      console.log("Your order will be delivered to your unit, from now, you cannot modify it");
      console.log( cart.totalPrice + " will be deducted from your budget");
      console.log( "Thank you for your purchase");
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
      return { error: "Error finishing cart" };
    }
  };
}
