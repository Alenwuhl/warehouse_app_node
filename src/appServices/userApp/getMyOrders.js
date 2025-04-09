import rl from "../../config/readline.js";
import startShopping from "./shoppingApp.js";
import * as cartsController from "../../controllers/cart.controller.js";
import modifyMyOrder from "./modifyMyOrder.js";
import finishPurchase from "./finishPurchase.js";


export default async function getMyOrder(unit) {
  try {
    const cart = await cartsController.getActiveCart(unit);
    
    if (!cart) {
      console.log("No active order found.");
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
    console.log(`Order number: ${cart.orderNumber}`);
    console.log(`Status: ${cart.status}`);
    console.log("Items:");
    products.forEach((item, index) => {
      console.log(
        `  ${index + 1}. ${item.title}: Product ID - ${item.id}, Quantity - ${
          item.quantity
        }`
      );
    });
    console.log(`Total Price: $${cart.totalPrice}`);
    console.log("------------------------------");

    console.log("What do you want to do?");
    console.log("1. Eliminate order");
    console.log("2. Modify order");
    console.log("3. Finish purchase");
    console.log("4. No, return to the menu");
    const answer = await rl.question("- ");
    while (answer !== "1" && answer !== "2" && answer !== "3" && answer !== "4") {
      console.log("Invalid answer. Please try again.");
      answer = await rl.question("- ");
    }
    switch (answer) {
      case "1":
        try {
          await cartsController.deleteCart(cart);
          console.log("Order deleted successfully.");
          console.log("Returning to the menu...");
          await startShopping(unit);
        }
        catch (error) {
          console.log("Error deleting products: ", error.message);
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
