import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"
import viewAllProducts from "./viewAllProducts.js";
import buyAProduct from "./buyAProduct.js";
import getMyOrder from "./getMyOrders.js";
import displayMainMenu from "../displayMenu.js";

export default async function startShopping(unit) {
  logger.http("Welcome to the store!");
  console.log("---------------------------------")
  logger.info("1. View products");
  logger.info("2. Buy a product");
  logger.info("3. Actions on your active order");
  logger.info("4. Logout");
  console.log("---------------------------------")

  let answer = await rl.question("Please enter your answer: ");

  while (answer !== "1" && answer !== "2" && answer !== "3" && answer !== "4") {
    logger.fatal("Invalid answer. Please try again.");
    logger.info("1. View products");
    logger.info("2. Buy a product");
    logger.info("3. Actions on your active order");
    logger.info("4. Logout");
    answer = await rl.question("- ");
  }

  switch (answer) {
    case "1":
      await viewAllProducts(unit);
      break;
    case "2":
      await buyAProduct(unit);
      break;
    case "3":
      await getMyOrder(unit);
      break;
    case "4":
      await displayMainMenu();
      break;
    default:
      logger.fatal("Invalid answer. Please try again.");
      await startShopping(unit);
  }
}
