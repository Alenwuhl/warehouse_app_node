import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js";

export default async function findProductsByExpirationDate() {
  try {
    logger.info(
      "Enter a date and you will get all products that will be expired on that date"
    );
    const year = await rl.question("Enter a year: ");
    const month = await rl.question("Enter a month: ");
    const day = await rl.question("Enter a day: ");
    const date = { year, month, day };
    const products = await productsController.findProductsByExpirationDate(
      date
    );

    if (products) {
      console.log("Al this products will be expired on this date");
      console.log("------------------------------");
      products.forEach((product) => {
        logger.info(`ID: ${product._id}`);
        logger.info(`Name: ${product.title}`);
        logger.info(`Description: ${product.description}`);
        logger.info(`Category: ${product.category}`);
        logger.info(`Price: ${product.price}`);
        logger.info(`Stock: ${product.stock}`);
        logger.info(`Expiration date: ${product.expirationDate}`);
        console.log("------------------------------");
      });
      let enter = await rl.question("Press enter to return to the menu...");
      while (enter !== "") {
        enter = await rl.question("Press enter to return to the menu...");
      }
    }
  } catch (error) {
    console.log(error);
    await startAdminApp();
  }
}
