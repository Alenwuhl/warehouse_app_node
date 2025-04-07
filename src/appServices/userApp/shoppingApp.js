import rl from "../../config/readline.js";
import viewAllProducts from "./viewAllProducts.js";

export default async function startShopping(unit) {
  console.log("Welcome to the store!");
  console.log("1. View products");
  console.log("2. Buy a product");
  console.log("3. View your orders");
  console.log("4. Exit");

  const answer = await rl.question("Please enter your answer: ");

  switch (answer) {
    case "1":
      await viewAllProducts(unit);
      break;
    case "2":
      await buyAProduct(unit);
      break;
    //   case "3":
    //     const orders = await orderController.getOrdersByUnit(unit);
    //     console.log(orders);
    //     break;
    //   case "4":
    //     rl.close();
    //     return;
    default:
      console.log("Invalid answer. Please try again.");
      startShopping(unit);
  }
}
