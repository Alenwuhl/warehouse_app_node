import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js"

export default async function viewAllProducts() {
  try {
    const availableProducts = await productsController.getAllProductsNamesAndIds();
    console.log("Products: ", availableProducts);
    const enter = await rl.question(
      "Press enter to return to the menu..."
    );
    if (enter === "") {
      await startAdminApp();
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
