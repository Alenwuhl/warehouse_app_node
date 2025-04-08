import rl from "../../config/readline.js";
import viewAllProducts from "./viewAllProducts.js";
import buyAProduct from "./buyAProduct.js"
import getMyOrder from "./getMyOrders.js"

export default async function startShopping(unit) {
  console.log("Welcome to the store!");
  console.log("1. View products");
  console.log("2. Buy a product");
  console.log("3. View your active order");
  console.log("4. Logout");

  const answer = await rl.question("Please enter your answer: ");

  switch (answer) {
    case "1":
      await viewAllProducts(unit);
      break;
    case "2":
      await buyAProduct(unit);
      break;
      case "3":
        await getMyOrder(unit)
        break;
      case "4":
        await startApp()
    default:
      console.log("Invalid answer. Please try again.");
      startShopping(unit);
  }
}
