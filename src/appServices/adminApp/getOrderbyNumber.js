
import * as cartController from "../../controllers/cart.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"

export default async function getOrderByNumber() {
  try {

    const orderNumbers = await cartController.getAllOrdersNumbers();
    if (!orderNumbers) {
      logger.fatal("No orders found.");
      return;
    }
    console.log('This are the orders numbers:');
    logger.info(
      orderNumbers
        .map((order, i) => {
        return ` - ${order}`;
        })
        .join("\n")
    );
    const orderNumber = await rl.question("Please enter the order number: ");
    if (!orderNumber) {
      logger.fatal("No order number provided.");
      return;
    }
    const order = await cartController.getOrderByNumber(orderNumber);
    if (!order) {
      logger.fatal("Order not found.");
      return;
    }
    console.log("Order details:");
    logger.info(order)
  } catch (error) {
    console.error("Error fetching order:", error);
  }
  await startAdminApp();
}
