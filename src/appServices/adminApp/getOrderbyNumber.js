
import * as cartController from "../../controllers/cart.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";

export default async function getOrderByNumber() {
  try {
    console.log('This are the orders numbers:');
    const orderNumbers = await cartController.getAllOrdersNumbers();
    if (!orderNumbers) {
      console.log("No orders found.");
      return;
    }
    console.log(
      orderNumbers
        .map((order, i) => {
        return ` - ${order}`;
        })
        .join("\n")
    );
    const orderNumber = await rl.question("Please enter the order number: ");
    if (!orderNumber) {
      console.log("No order number provided.");
      return;
    }
    const order = await cartController.getOrderByNumber(orderNumber);
    if (!order) {
      console.log("Order not found.");
      return;
    }
    console.log("Order details:", order);
  } catch (error) {
    console.error("Error fetching order:", error);
  }
  await startAdminApp();
}
