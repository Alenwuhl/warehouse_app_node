import rl from "../../config/readline.js";
import viewAllProducts from "./viewAllProducts.js";
import buyAProduct from "./buyAProduct.js";
import getMyOrder from "./getMyOrders.js";
import modifyMyOrder from "./modifyMyOrder.js";
import displayMainMenu from "../displayMenu.js";

export default async function startShopping(unit) {
  console.log("Welcome to the store!");
  console.log("1. View products");
  console.log("2. Buy a product");
  console.log("3. Actions on your active order");
  console.log("4. Logout");

  const answer = await rl.question("Please enter your answer: ");

  while (answer !== "1" && answer !== "2" && answer !== "3" && answer !== "4") {
    console.log("Invalid answer. Please try again.");
    console.log("1. View products");
    console.log("2. Buy a product");
    console.log("3. Actions on your active order");
    console.log("4. Logout");
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
      console.log("Invalid answer. Please try again.");
      await startShopping(unit);
  }
}
