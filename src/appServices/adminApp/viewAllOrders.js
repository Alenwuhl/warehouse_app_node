import * as cartsController from "../../controllers/cart.controller.js";
import rl from "../../config/readline.js"

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
