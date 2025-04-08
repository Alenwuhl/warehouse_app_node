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
  console.log("3. Update a product)");
  console.log("4. Delete a product");
  console.log("5. View all units");
  console.log("6. Create a new unit");
  console.log("7. Update budget for an unit");
  console.log("8. Delete a unit");
  console.log(
    "9. Find orders by order number"
  ); 
  console.log("10. Find orders by status");
  console.log("11. Find orders by product"); 
  console.log("12. Find products by category");
  console.log("13. Find products by defective product");
  console.log("14. Find products by expiration date");
  console.log("15. Logout");

  const answer = await rl.question("Please enter your answer: ");

  switch (answer) {
    case "1":
      try {
        await viewAllProducts();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "2":
      try {
        await createNewProduct();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "3":
      try {
        await updateProduct();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "4":
      try {
        await deleteProduct();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "5":
      try {
        await viewAllUnits();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "6":
      try {
        await createNewUnit();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "7":
      try {
        await updateUnit();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "8":
      try {
        await deleteUnit();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
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
      try {
        await findProductsByCategory();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "13":
      try {
        await findProductsByDefectiveProduct();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "14":
      try {
        await findProductsByExpirationDate();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "15":
      console.log("Exiting the admin app...");
      displayMainMenu();
      return;
    default:
      console.log("Invalid answer. Please try again.");
      startAdminApp();
  }
}
