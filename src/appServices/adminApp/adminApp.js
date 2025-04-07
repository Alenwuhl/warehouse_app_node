import * as productsController from "../../controllers/products.controller.js";
// import rl from "../server.js";
import viewAllProducts from "./viewAllProducts.js";
import createNewProduct from "./createNewProduct.js";
import updateProduct from "./updateProduct.js";
import deleteProduct from "./deleteProduct.js";
import viewAllUnits from "./viewAllUnits.js";
import createNewUnit from "./createNewUnit.js";
import viewAllOrders from "./viewAllOrders.js";
import findProductsByCategory from "./findProductsByCategory.js";
import findProductsByDefectiveProduct from "./findProductsByDefectiveProduct.js";
import findProductsByExpirationDate from "./findProductsByExpirationDate.js";
import updateUnit from "./updateUnit.js"; 
import deleteUnit from "./deleteUnit.js";
import rl from "../../config/readline.js";

export default async function startAdminApp() { 
  console.log("Welcome to the admin app!");
  console.log("1. View all products ----(Done)");
  console.log("2. Create a new product ----(Done)");
  console.log("3. Update a product ----(Done))");
  console.log("4. Delete a product ----(Done)");
  console.log("5. View all units  ----(Done)");
  console.log("6. Create a new unit ----(Done)");
  console.log("7. Update budget for an unit ----(Done)");
  console.log("8. Delete a unit ----(Done)");
  console.log("9. View all orders"); /* I dont have the orders*/ 
  console.log("10. Find orders by order number"); /* I dont have the orders*/ 
  console.log("11. Find orders by status");/* I dont have the orders*/ 
  console.log("12. Find orders by product");/* I dont have the orders*/ 
  console.log("13. Find products by category ----(Done)");
  console.log("14. Find products by defective product ----(Done)");
  console.log("15. Find products by expiration date ----(Done)");
  console.log("16. Exit");

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
      try{
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
      try {
        await viewAllOrders();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    // case "10":
    //   const orderNumber = await rl.question("Please enter the order number: ");
    //   const order = await cartsController.getOrderByNumber(orderNumber);
    //   console.log("Order: ", order);
    //   break;
    // case "11":
    //   const orderStatus = await rl.question("Please enter the order status: ");
    //   const ordersByStatus = await cartsController.getOrdersByStatus(
    //     orderStatus
    //   );
    //   console.log("Orders: ", ordersByStatus);
    //   break;
    // case "12":
    //   const orderProduct = await rl.question("Please enter the product name: ");
    //   const ordersByProduct = await cartsController.getOrdersByProduct(
    //     orderProduct
    //   );
    //   console.log("Orders: ", ordersByProduct);
    //   break;
    case "13":
      try {
        await findProductsByCategory();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "14":
      try {
        await findProductsByDefectiveProduct();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "15":
      try {
        await findProductsByExpirationDate();
      } catch (error) {
        console.error(error);
        await startAdminApp();
      }
      break;
    case "16":
      console.log("Exiting the admin app...");
      rl.close();
      return;
    default:
      console.log("Invalid answer. Please try again.");
      startAdminApp();
  }
}
