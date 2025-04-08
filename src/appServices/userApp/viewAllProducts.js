import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js";
import startShopping from "./shoppingApp.js";

export default async function viewAllProducts(unit) {
  try {
    const availableProducts =
      await productsController.getAllProductsNamesAndIds();
    console.log(`Products:`);
    console.log(`
      ${availableProducts
        .map((product, index) => `${index + 1}. ${product.title}`)
        .join("\n")}
      `);
    const enter = await rl.question("Press enter to return to the menu...");
    if (enter === "") {
      await startShopping(unit);
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
