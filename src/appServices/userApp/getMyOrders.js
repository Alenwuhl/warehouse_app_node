import rl from "../../config/readline.js";
import startShopping from "./shoppingApp.js";
import * as cartsController from "../../controllers/cart.controller.js";
import * as productsController from "../../controllers/products.controller.js";
import Product from "../../models/products.model.js";

export default async function getMyOrder(unit) {
  try {
    const { cartId } = await cartsController.getActiveCart(unit);
    
    const cart = await cartsController.getCartById(cartId);
    if (!cart) {
      console.log("No active order found.");
      console.log("Returning to the menu...");
      await startShopping(unit);
      return;
    }
    const products = await productsController.getProductsbyIds(cart);
    console.log(`Your order:`);
    console.log(
      `${products
        .map((p) => `- ${p.title} - $${p.price}`)
        .join("\n")}`
    );

    console.log("Do you want to eliminate your order?");
    console.log("1. Yes");
    console.log("2. No, return to the menu");
    const answer = await rl.question("- ");
    while (answer !== "1" && answer !== "2") {
      console.log("Invalid answer. Please try again.");
      answer = await rl.question("- ");
    }
    switch (answer) {
      case "1":
        try {
          await cartsController.deleteCart(cart);
          console.log("Products deleted successfully.");
          console.log("Returning to the menu...");
          await startShopping(unit);
        }
        catch (error) {
          console.log("Error deleting products: ", error.message);
        }
        break;
      case "2":
        console.log("Returning to the menu...");
        await startShopping(unit);
        break;
      default:
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
