import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });

export default async function viewAllProducts() {
  try {
    const availableProducts = await productsController.getProductsNames();
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
