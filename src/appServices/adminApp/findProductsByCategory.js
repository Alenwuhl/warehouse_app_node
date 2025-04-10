import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js"
import { logger } from "../../config/loggerCustom.js"

export default async function findProductsByCategory() {
  try {
    console.log("Choose a category: ");
    logger.info("1. weapons");
    logger.info("2. clothing");
    logger.info("3. electronics");
    logger.info("4. other");
    let category = await rl.question("- ");
    switch (category) {
      case "1":
        category = "weapons";
        break;
      case "2":
        category = "clothing";
        break;
      case "3":
        category = "electronics";
        break;
      case "4":
        category = "other";
        break;
      default:
    }
    const products = await productsController.findProductsByCategory(category);
    if (products) {
      logger.info(`Products with category ${category}: `);
      console.log("------------------------------");
      products.forEach((product) => {
        logger.info(`ID: ${product._id}`);
        logger.info(`Name: ${product.title}`);
        logger.info(`Description: ${product.description}`);
        logger.info(`Category: ${product.category}`);
        logger.info(`Price: ${product.price}`);
        logger.info(`Stock: ${product.stock}`);
        console.log("------------------------------");
      });
      const enter = await rl.question("Press enter to return to the menu...");
      if (enter === "") {
        await startAdminApp();
      }
    } else {
      logger.fatal("No products found with this category");
      let enter = await rl.question("Press enter to return to the menu...");
      while (enter !== "") {
        enter = await rl.question("Press enter to return to the menu...");
      }
      if (enter === "") {
        await startAdminApp();
      }
    }
  } catch (error) {
    console.error(error);
    await startAdminApp();
  }
}
