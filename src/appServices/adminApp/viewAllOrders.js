import * as cartsController from "../../controllers/cart.controller.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });

export default async function viewAllOrders() {
  try {
    const orders = await cartsController.getAllCarts();
    console.log("Orders: ", orders);
    const enter = await rl.question("Press enter to return to the menu...");
    if (enter === "") {
      await startAdminApp();
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
