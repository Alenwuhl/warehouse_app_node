import Carts from "../models/carts.models.js";
import * as unitsController from "../controllers/units.controller.js";
import ProductService from "./products.service.js";

const productsService = new ProductService();

export default class CartsService {
  async activeCart(unit) {
    try {
      const cart = await Carts.findOne({ unitId: unit, status: "active" });

      if (cart) {
        const cartId = cart.id;

        return { cartId, unit };
      } else {
        return false;
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
    }
    catch (error) {
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
  async AddProductToCart(productId, quantity, activeCart, unit) {
    try {
      // const totalPrice =
      await productsService.verifyThePurchase(productId, quantity, unit);

      await Carts.updateOne(
        { _id: activeCart },
        {
          $push: {
            items: [{ productId: productId, quantity: quantity }],
          },
        }
      );

      return activeCart;
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
  // async addProductToCart(cartItem) {
  //   try {
  //     const unitId = cartItem.unitId;
  //     const cart = await Carts.find({ unitId: unitId, status: "active" });
  //     if (!cart) {
  //       const cartData = {
  //         items: {
  //           productId: cartItem.productId,
  //           quantity: cartItem.quantity,
  //         },
  //         unitId: unitId,
  //         status: "active",
  //       };
  //       const newCart = await CartsService.createCart(cartData);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return { error: "Error adding product to cart" };
  //   }
  // }
  finishCart = async (cartId) => {
    try {
      const cart = await Carts.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const unitBudget = await Unit.returnUnitBudget(cart.user);
      if (unitBudget.budget < cart.totalPrice) {
        throw new Error("Not enough budget");
      }
      cart.status = "completed";
      console.log("Your order has been completed");
      console.log(
        "Your order will be delivered to your unit, from now, you cannot modify it"
      );
      console.log(cart.totalPrice + " will be deducted from your budget");
      console.log("Thank you for your purchase");
      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
      return { error: "Error finishing cart" };
    }
  };
}
