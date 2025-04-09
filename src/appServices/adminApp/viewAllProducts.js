import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js"

export default async function viewAllProducts() {
  try {
    const availableProducts = await productsController.getProducts();
    if (availableProducts.length === 0) {
      console.log("No products available.");
    } else {
      console.log("Available products:");
      availableProducts.forEach((product) => {
        console.log(
          `Title: ${product.title}, Description: ${product.description}, Price: $${product.price}`);
      });
    }
    
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
