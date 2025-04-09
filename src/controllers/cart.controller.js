import CartsService from "../services/carts.service.js";

const cartsService = new CartsService();

export async function getAllCarts() {
  try {
    const carts = await cartsService.getCarts();
    if (!carts) {
      throw new Error("No orders found");
    }
    return carts;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function addProductToCart(productId, quantity, unit) {
  try {
    return await cartsService.addProductToCart(productId, quantity, unit);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
}

export async function getAllOrdersNumbers() {
  try {
    const orders = await cartsService.getOrdersNumbers();
    if (!orders) {
      console.log("No orders found");
    }
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderByNumber(orderNumber) {
  try {
    const order = await cartsService.getOrderByNumber(orderNumber);
    if (!order) {
      console.log("Order not found");
    }
    return order;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrdersByStatus(status) {
  try {
    const orders = await cartsService.getOrdersByStatus(status);
    if (!orders) {
      console.log("No orders found");
    }
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderByProductId(productId) {
  try {
    const orders = await cartsService.getOrderByProductId(productId);
    if (!orders) {
      console.log("No orders found");
    }
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function updateCart(id, updateValue) {
  try {
    const updatedCart = await cartsService.updateCart(id, updateValue, {
      new: true,
    });
    if (!updatedCart) {
      console.log("Cart not found");
      return;
    }
    return updatedCart;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}
export async function deleteCart(id) {
  try {
    const deletedCart = await cartsService.deleteCart(id);
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return deletedCart;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
}

export async function deleteProductFromCart(productId, cartId) {
  try {
    const cart = await cartsService.deleteProductFromCart(productId, cartId);
    if (!cart) {
      console.log("Cart not found");
      return;
    }
    return cart;
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    throw error;
  }
}
export async function getActiveCart(unit) {
  try {
    return await cartsService.activeCart(unit);
  } catch (error) {
    console.log("active cart didnt found");
  }
}
