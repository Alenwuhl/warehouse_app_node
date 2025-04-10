import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"
import startShopping from "./shoppingApp.js";

export default async function viewAllProducts(unit) {
  try {
    const availableProducts =
      await productsController.getAllProductsNamesAndIds();
    console.log(`Products:`);
    logger.info(`
      ${availableProducts
        .map((product, index) => `${index + 1}. ${product.title}`)
        .join("\n")}
      `);
    let enter = await rl.question("Press enter to return to the menu...");
    if (enter === "") {
      await startShopping(unit);
    }
    while (enter !== "") {
      logger.fatal("Invalid input. Please press enter to return to the menu.");
      enter = await rl.question("- ");
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
