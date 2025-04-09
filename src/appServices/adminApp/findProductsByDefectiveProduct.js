import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";

export default async function findProductsByDefectiveProduct() {
  try {
    const defectiveProducts = await productsController.getDefectiveProducts();
    console.log("Defective Products: ");
    console.log("------------------------------");
    defectiveProducts.forEach((product) => {
      console.log(`ID: ${product._id}`);
      console.log(`Name: ${product.title}`);
      console.log(`Description: ${product.description}`);
      console.log(`Category: ${product.category}`);
      console.log(`Price: ${product.price}`);
      console.log(`Stock: ${product.stock}`);
      console.log("------------------------------");
    });
    const enter = await rl.question("Press enter to return to the menu...");
    if (enter === "") {
      await startAdminApp();
    }
  } catch (error) {
    console.log("Error: ", error.message);
    console.log("Returning to the menu...");
    await startAdminApp();
  }
}
