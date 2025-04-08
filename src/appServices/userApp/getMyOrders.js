import rl from "../../config/readline.js";
import startShopping from "./shoppingApp.js";
import * as cartsController from "../../controllers/cart.controller.js";
import * as productsController from "../../controllers/products.controller.js";
import Product from "../../models/products.model.js";

export default async function getMyOrder(unit) {
  try {
    const { cartId } = await cartsController.getActiveCart(unit);
    const cart = await cartsController.getCartById(cartId);
    const products = await productsController.getProductsbyIds(cart);
    console.log(`Your order:`);
    console.log(
      `${products
        .map((p, i) => `${i + 1}. ${p.title} - $${p.price}`)
        .join("\n")}`
    );

    let enter = await rl.question("Press enter to return to the menu...");
    while (enter !== "") {
      enter = await rl.question("Press enter to return to the menu...");
    }
    if (enter === "") {
      await startShopping();
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
