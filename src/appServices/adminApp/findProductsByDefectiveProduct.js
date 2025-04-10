import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"

export default async function findProductsByDefectiveProduct() {
  try {
    const defectiveProducts = await productsController.getDefectiveProducts();
    console.log("Defective Products: ");
    console.log("------------------------------");
    defectiveProducts.forEach((product) => {
      logger.info(`ID: ${product._id}`);
      logger.info(`Name: ${product.title}`);
      logger.info(`Description: ${product.description}`);
      logger.info(`Category: ${product.category}`);
      logger.info(`Price: ${product.price}`);
      logger.info(`Stock: ${product.stock}`);
      console.log("------------------------------");
    });
    let enter = await rl.question("Press enter to return to the menu...");
    while (enter !== "") {
      enter = await rl.question("Press enter to return to the menu...");
    }
    if (enter === "") {
      await startAdminApp();
    }
  } catch (error) {
    console.log("Error: ", error.message);
    console.log("Returning to the menu...");
    await startAdminApp();
  }
}
