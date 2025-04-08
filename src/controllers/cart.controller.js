import CartsService from "../services/carts.service.js";

const cartsService = new CartsService();

export async function getAllCarts() {
  try {
    const carts = await cartsService.getCarts();
    if (!carts) {
      throw new Error("No orders found");
    }
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

export const createCart = async (req, res) => {
  try {
    const cart = req.body;
    const newCart = await cartsService.createCart(cart);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
export const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCart = await cartsService.deleteCart(id);
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(deletedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
