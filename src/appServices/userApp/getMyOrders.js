import rl from "../../config/readline.js";
import startShopping from "./shoppingApp.js";
import * as cartsController from "../../controllers/cart.controller.js";
import modifyMyOrder from "./modifyMyOrder.js";
import finishPurchase from "./finishPurchase.js";
import { logger } from "../../config/loggerCustom.js";


export default async function getMyOrder(unit) {
  try {
    const cart = await cartsController.getActiveCart(unit);
    
    if (!cart) {
      logger.fatal("No active order found.");
      console.log("Returning to the menu...");
      await startShopping(unit);
      return;
    }
    const products = cart.items.map((item) => {
      return {
        id: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      };
    }
    );
    console.log(`Your order:`);
    console.log( `------------------------------`);
    logger.info(`Order number: ${cart.orderNumber}`);
    logger.info(`Status: ${cart.status}`);
    logger.info("Items:");
    products.forEach((item, index) => {
      logger.info(
        `  ${index + 1}. ${item.title}: Product ID - ${item.id}, Quantity - ${
          item.quantity
        }`
      );
    });
    logger.info(`Total Price: $${cart.totalPrice}`);
    console.log("------------------------------");

    console.log("What do you want to do?");
    logger.info("1. Eliminate order");
    logger.info("2. Modify order");
    logger.info("3. Finish purchase");
    logger.info("4. No, return to the menu");
    let answer = await rl.question("- ");
    while (answer !== "1" && answer !== "2" && answer !== "3" && answer !== "4") {
      logger.fatal("Invalid answer. Please try again.");
      answer = await rl.question("- ");
    }
    switch (answer) {
      case "1":
        try {
          await cartsController.deleteCart(cart);
          logger.http("Order deleted successfully.");
          console.log("Returning to the menu...");
          await startShopping(unit);
        }
        catch (error) {
          logger.fatal("Error deleting products: ", error.message);
        }
        break;
      case "2":
        await modifyMyOrder(cart);
        break;
      case "3":
        await finishPurchase(cart);
        break;
      case "4":
        console.log("Returning to the menu...");
        await startShopping(unit);
        break;
      default:
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
