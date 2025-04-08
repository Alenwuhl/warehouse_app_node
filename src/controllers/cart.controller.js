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

export async function getCartById(id) {
  try {
    const cart = await cartsService.getCartById(id);
    if (!cart) {
      console.log("Cart not found");
    }
    return cart;
  } catch (error) {
    console.log(error);
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

export async function getOrderByProduct(productId) {
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

// export const createCart = async (req, res) => {
//   try {
//     const cart = req.body;
//     const newCart = await cartsService.createCart(cart);
//     res.status(201).json(newCart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = req.body;
    const updatedCart = await cartsService.updateCart(id, cart);
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
export const getCartByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const carts = await cartsService.getCartByStatus(status);
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCartByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const cart = await cartsService.getCartByProductId(productId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export async function getActiveCart(unit) {
  try {
    return await cartsService.activeCart(unit);
  } catch (error) {
    console.log("active cart didnt found");
  }
}
