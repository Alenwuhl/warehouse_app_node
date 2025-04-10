import * as cartsController from "../../controllers/cart.controller.js";
import rl from "../../config/readline.js";
import startAdminApp from "./adminApp.js"
import { logger } from "../../config/loggerCustom.js"

export default async function viewAllOrders() {
  try {
    console.log("Please enter the status of the orders you want to see:");
    logger.info("1. Active");
    logger.info("2. Completed");
    logger.info("3. Return to the menu");
    let status = await rl.question("- ");

    switch (status) {
      case "1":
        status = "active";
        break;
      case "2":
        status = "completed";
        break;
      case "3":
        await startAdminApp();
        return;
      default:
        logger.fatal("Invalid option. Please try again.");
        await viewAllOrders();
        return;
    }

    const orders = await cartsController.getOrdersByStatus(status);
    if (!orders || orders.length === 0) {
      logger.fatal("No orders found for the selected status.");
      const enter = await rl.question("Press enter to return to the menu...");
      if (enter === "") {
        await startAdminApp();
      }
    }
    console.log("Orders: ");
    logger.info(
      orders
        .map((order) => {
          return `
          Order ID: ${order.id}
          Total price: ${order.totalPrice}
          Unit: ${order.unitId}
          Status: ${order.status}
    ---------------------------`;
        })
        .join("\n")
    );
    let enter = await rl.question("Press enter to return to the menu...");
    while (enter !== "") {
      enter = await rl.question("Press enter to return to the menu...");
    }
    if (enter === "") {
      await startAdminApp();
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
