import * as productsController from "./controllers/products.controller.js";
import displayMainMenu from "./displayMenu.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = createInterface({ input, output });

export default async function startAdminApp() {
  console.log("Welcome to the admin app!");
  console.log("1. View all products");
  console.log("2. Create a new product");
  console.log("3. Update a product");
  console.log("4. Delete a product");
  console.log("5. View all units");
  console.log("6. Create a new unit");
  console.log("7. Update budget for an unit");
  console.log("8. Delete an unit");
  console.log("9. View all orders");
  console.log("10. Find orders by order number");
  console.log("11. Find orders by status");
  console.log("12. Find orders by product");
  console.log("13. Find products by category");
  console.log("14. Find products by defective product");
  console.log("15. Find products by expiration date");
  console.log("16. Exit");

  const answer = await rl.question("Please enter your answer: ");
  console.log("Your answer is: ", answer);

  switch (answer) {
    case "1":
      console.log("You have selected option 1");
      const availableProducts = await productsController.getProductsNames();
      console.log("Products: ", availableProducts);
      // console.log("Products: ", await productController.getAllProducts());
      break;
    case "2":
      const productName = await rl.question("Please enter the product name: ");
      const productCategory = await rl.question(
        "Please enter the product category, you can choose between: electronics, clothing, food: "
      );
      const productPrice = await rl.question(
        "Please enter the product price: "
      );
      const productStock = await rl.question(
        "Please enter the product stock: "
      );
      const productExpirationDate = await rl.question(
        "Please enter the product expiration date: "
      );
      const productStatus = await rl.question(
        "Please enter the product status: "
      );
      await productsController.createProduct(
        productName,
        productCategory,
        productPrice,
        productStock,
        productExpirationDate,
        productStatus
      );
      break;
    case "4":
      const productNameToDelete = await rl.question(
        "Please enter the product name to delete: "
      );
      await productsController.deleteProduct(productNameToDelete);
      break;
    case "5":
      const units = await unitsController.getAllUnits();
      console.log("Units: ", units);
      break;
    case "6":
      const unitName = await rl.question("Please enter the unit name: ");
      const unitBudget = await rl.question("Please enter the unit budget: ");
      await unitsController.createUnit(unitName, unitBudget);
      break;
    case "7":
      const unitNameToUpdate = await rl.question(
        "Please enter the unit name to update: "
      );
      const newUnitBudget = await rl.question(
        "Please enter the new unit budget: "
      );
      await unitsController.updateUnitBudget(unitNameToUpdate, newUnitBudget);
      break;
    case "8":
      const unitNameToDelete = await rl.question(
        "Please enter the unit name to delete: "
      );
      await unitsController.deleteUnit(unitNameToDelete);
      break;
    case "9":
      const orders = await ordersController.getAllOrders();
      console.log("Orders: ", orders);
      break;
    case "10":
      const orderNumber = await rl.question("Please enter the order number: ");
      const order = await ordersController.getOrderByNumber(orderNumber);
      console.log("Order: ", order);
      break;
    case "11":
      const orderStatus = await rl.question("Please enter the order status: ");
      const ordersByStatus = await ordersController.getOrdersByStatus(
        orderStatus
      );
      console.log("Orders: ", ordersByStatus);
      break;
    case "12":
      const orderProduct = await rl.question("Please enter the product name: ");
      const ordersByProduct = await ordersController.getOrdersByProduct(
        orderProduct
      );
      console.log("Orders: ", ordersByProduct);
      break;
    case "13":
      const orderCustomer = await rl.question(
        "Please enter the customer name: "
      );
      const ordersByCustomer = await ordersController.getOrdersByCustomer(
        orderCustomer
      );
      console.log("Orders: ", ordersByCustomer);
      break;
    case "14":
      const orderDate = await rl.question("Please enter the order date: ");
      const ordersByDate = await ordersController.getOrdersByDate(orderDate);
      console.log("Orders: ", ordersByDate);
      break;
    case "15":
      const expirationDate = await rl.question(
        "Please enter the expiration date: "
      );
      const productsByExpirationDate =
        await productsController.getProductsByExpirationDate(expirationDate);
      console.log(
        `Products with expiration date on ${expirationDate}: `,
        productsByExpirationDate
      );
      break;
    case "16":
      console.log("Exiting the admin app...");
      rl.close();
      return;

    //   case "2":
    //     const productName = await rl.question("Please enter the product name: ");
    //     // const productCategory = await rl.question("Please enter the product category, you can choose between: electronics, clothing, food: ");
    //     const productPrice = await rl.question("Please enter the product price: ");
    //     const productStock = await rl.question("Please enter the product stock: ");
    //     await productController.createProduct(productName, productCategory, productPrice, productStock);
    //     console.log(`Product ${productName} created successfully.`);
    //     break;
    // case "3":
    //   const newProductName = await rl.question("Please enter the new product name: ");
    default:
      console.log("Invalid answer. Please try again.");
      displayMainMenu();
  }
}
