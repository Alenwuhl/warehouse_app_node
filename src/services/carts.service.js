import Carts from "../models/carts.models.js";
import * as unitsController from "../controllers/units.controller.js";
import ProductService from "./products.service.js";

const productsService = new ProductService();

export default class CartsService {
  async activeCart(unit) {
    try {
      const cart = await Carts.findOne({ unitId: unit, status: "active" });
      if (cart) {
        return cart
      } else {
        return null;
      }
    } catch (error) {
      console.log("There is no active cart in your unit");
    }
  }

  async getOrdersNumbers() {
    try {
      const orders = await Carts.find();
      const orderNumbers = orders.map((order) => order.orderNumber);
      if (!orderNumbers) {
        console.log("No orders numbers found");
      }
      if (!orders) {
        console.log("No orders found");
      }
      return orderNumbers;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  async getOrderByProductId(productId) {
    try {
      const orders = await Carts.find({
        items: { $elemMatch: { productId: productId } },
      });

      if (!orders) {
        console.log("No orders found");
      }
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  async getOrdersByStatus(status) {
    try {
      const orders = await Carts.find({ status: status });
      if (!orders) {
        console.log("No orders found");
      }
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  async addProductToCart(productId, quantity, unit) {
    try {
      let cart = await this.activeCart(unit);
      if (!cart) {
        const orderNnumber = Math.floor(Math.random() * 1000000);
        cart = await this.createCart({
          items: [],
          orderNumber: orderNnumber,
          totalPrice: 0,
          unitId: unit,
          status: "active",
        });
      }
      if (cart.items.length > 0) {
        const index = cart.items.findIndex(
          (item) => item.productId === productId
        );
        if (index !== -1) {
          cart.items[index].quantity += quantity;
        } else {
          cart.items = [
            ...cart.items,
            { productId: productId, quantity: quantity },
          ];
        }
      } else {
        cart.items = [{ productId: productId, quantity: quantity }];
      }
      const product = await productsService.getProductById(productId);
      cart.totalPrice += product.price * quantity;
      await cart.save();
      return cart;
    } catch (error) {
      console.log("The product could not be added to your cart");
      console.log(error);
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await Carts.find();
      return carts;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching carts" };
    }
  }

  async getCartById(id) {
    try {
      return await Carts.findById(id);
    } catch (error) {
      console.error(error);
      return { error: "Error fetching cart by ID" };
    }
  }

  getCartByUserId = async (userId) => {
    try {
      const cart = await Carts.findOne({ user: userId });
      return cart;
    } catch (error) {
      console.error(error);
      return { error: "Error fetching cart by user ID" };
    }
  };

  async getOrderByNumber(orderNumber) {
    try {
      const order = await Carts.findOne({ orderNumber });
      if (!order) {
        console.log("Order not found");
      }
      return order;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  async createCart(cartData) {
    try {
      const newCart = await Carts.create(cartData);
      return newCart;
    } catch (error) {
      console.error(error);
      return { error: "Error creating cart" };
    }
  }

  async updateCart(id, updateValue) {
    try {
      const updatedCart = await Carts.findByIdAndUpdate(id, updateValue);
      return updatedCart;
    } catch (error) {
      console.error(error);
      return { error: "Error updating cart" };
    }
  }
  async deleteProductFromCart(productId, cartId) {
    try {
      const cart = await Carts.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const productIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.items.splice(productIndex, 1);
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
      return { error: "Error deleting product from cart" };
    }
  }

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
}
