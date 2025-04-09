import * as productsController from "../../controllers/products.controller.js";
// import rl from "../server.js";
import viewAllProducts from "./viewAllProducts.js";
import createNewProduct from "./createNewProduct.js";
import updateProduct from "./updateProduct.js";
import deleteProduct from "./deleteProduct.js";
import viewAllUnits from "./viewAllUnits.js";
import createNewUnit from "./createNewUnit.js";
import getOrdersByStatus from "./getOrdersByStatus.js";
import findProductsByCategory from "./findProductsByCategory.js";
import findProductsByDefectiveProduct from "./findProductsByDefectiveProduct.js";
import findProductsByExpirationDate from "./findProductsByExpirationDate.js";
import getOrderByProduct from "./getOrderByProduct.js";
import updateUnit from "./updateUnit.js";
import deleteUnit from "./deleteUnit.js";
import rl from "../../config/readline.js";
import displayMainMenu from "../displayMenu.js";
import getOrderbyNumber from "./getOrderbyNumber.js";

export default async function startAdminApp() {
  console.log("Welcome to the admin app!");
  console.log("1. View all products");
  console.log("2. Create a new product");
  console.log("3. Update a product");
  console.log("4. Delete a product");
  console.log("5. View all units");
  console.log("6. Create a new unit");
  console.log("7. Update budget for an unit");
  console.log("8. Delete a unit");
  console.log("9. Find orders by order number");
  console.log("10. Find orders by status");
  console.log("11. Find orders by product");
  console.log("12. Find products by category");
  console.log("13. Find products by defective product");
  console.log("14. Find products by expiration date");
  console.log("15. Logout");

  let answer = await rl.question("Please enter your answer: ");

  while (isNaN(answer) || answer < 1 || answer > 15) {
    console.log("Invalid answer. Please enter a number between 1 and 15.");
    answer = await rl.question("Please enter your answer: ");
  }

  switch (answer) {
    case "1":
      await viewAllProducts();
      break;
    case "2":
      await createNewProduct();
      break;
    case "3":
        await updateProduct();
      break;
    case "4":
        await deleteProduct();
      break;
    case "5":
        await viewAllUnits();
      break;
    case "6":
        await createNewUnit();
      break;
    case "7":
        await updateUnit();
      break;
    case "8":
        await deleteUnit();
      break;
    case "9":
      await getOrderbyNumber();
      break;
    case "10":
      await getOrdersByStatus();
      break;
    case "11":
      await getOrderByProduct();
      break;
    case "12":
        await findProductsByCategory();
      break;
    case "13":
        await findProductsByDefectiveProduct();
      break;
    case "14":
        await findProductsByExpirationDate();
      break;
    case "15":
      console.log("Exiting the admin app...");
      await displayMainMenu();
      return;
    default:
      console.log("Invalid answer. Please try again.");
      await startAdminApp();
  }
}
