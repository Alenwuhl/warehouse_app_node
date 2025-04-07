import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js"

export default async function findProductsByDefectiveProduct() {
  try {
    const defectiveProducts = await productsController.getDefectiveProducts();
    console.log("Defective Products: ", defectiveProducts);
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