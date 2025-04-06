import express from "express";
import dotenv from "dotenv";
import "./config/mongo.config.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";
import * as userController from "./controllers/users.controller.js";
import * as unitsController from "./controllers/units.controller.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.listen(port);

const rl = createInterface({ input, output });

startServer();

async function startServer() {
  console.log("Do you know the rules?");
  console.log("1. Yes, I know the rules.");
  console.log("2. No, I don't know the rules.");

  const answer = await rl.question("Please enter your answer: ");
  
  if (answer === "1") {
    console.log("Great! Let's start.");
    await displayMainMenu();
    rl.close();
  } else if (answer === "2") {
    console.log("Please read the rules before proceeding.");
    console.log("- If you are a unit member, you can only see your own unit's budget.");
    console.log("- You can buy products from the store.");
    console.log("- You can only buy products if you have enough budget.");
    console.log("- You can modify your order until it is completed.");
    console.log("- You can only see your own orders.");
    console.log("---------------------------------------");
    console.log("If you are an admin, you can see all the products and units.");
    console.log("- You can also create, update and delete products.");
    console.log("- You can also create, update and delete units.");
    console.log("- You can find the orders by order number, status or for an specific product.");
    console.log("- You can find products by category, by defective product or by expiration date.");

    console.log("This is the end of the rules, do you want to continue?");
    console.log("1. Yes, I want to continue.");
    console.log("2. No, I don't want to continue.");
    const continueAnswer = await rl.question("Please enter your answer: ");
    if (continueAnswer === "1") {
      console.log("Great! Let's start.");
      rl.close();
      await displayMainMenu();
    } else if (continueAnswer === "2") {
      rl.close();
      return;
    } else {
      console.log("Invalid answer. Please try again.");
      startServer();
    }
  } else {
    console.log("Invalid answer. Please try again.");
    startServer();
  }
}

async function displayMainMenu() {
  console.log("Welcome to the main menu!");
  console.log("1. Register as an admin");
  console.log("2. Register as a unit member");
  console.log("3. Login with your account");

  const answer = await rl.question("Please enter your answer: ");
  
  switch (answer) {
    case "1":
      const adminName = await rl.question("Please enter your name: ");
      console.log("Your name is: ", adminName);
      
      if (!adminName) {
        console.log("Name is required.");
        return;
      }
      const adminPassword = await rl.question("Please enter your password: ");
      if (!adminPassword) {
        console.log("Password is required.");
        return;
      }
      userController.registerAdmin(adminName, adminPassword);
      console.log(`You have registered as an admin with the name: ${adminName}`);
      break;
    case "2":
      const name = await rl.question("Please enter your name: ");
      const password = await rl.question("Please enter your password: ");
      const unit = await rl.question(`Please enter your unit, you can choose between ${unitsController.getAllUnits()}:`);
      userController.registerUser(name, password, unit);
      console.log(`You have registered as a unit member with the name: ${name}`);
      console.log(`You have registered in the unit: ${unit}`);
      console.log(`Your budget is: ${unitsController.getUnitBudget(unit)}`);
      break;
    case "3":
      const loginName = await rl.question("Please enter your name: ");
      const loginPassword = await rl.question("Please enter your password: ");
      const loginResponse = await userController.loginUser(loginName, loginPassword);
      if (loginResponse.error) {
        console.log("Login failed. Please check your credentials.");
      } else {
        console.log(`Welcome back, ${loginResponse.user.name}!`);
        if (loginResponse.user.role === "admin") {
          console.log("You are logged in as an admin.");
          console.log("You can now manage products and units.");
          startAdminApp()
        } else {
          console.log("You are logged in as a unit member.");
          console.log(`Your unit budget is: ${unitsController.getUnitBudget(loginResponse.user.unit)}`);
          console.log("You can now buy products from the store.");
          startShopping(loginResponse.user.unit);
        }
      }
      break;
    default:
      console.log("Invalid answer. Please try again.");
      displayMainMenu();
  }
}

async function startAdminApp() {
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

}
// async function startShopping(unit) {
//   console.log("Welcome to the store!");
//   console.log("1. View products");
//   console.log("2. Buy a product");
//   console.log("3. View your orders");
//   console.log("4. Exit");

//   const answer = await rl.question("Please enter your answer: ");
  
//   switch (answer) {
//     case "1":
//       const products = await productController.getAllProducts();
//       console.log(products);
//       break;
//     case "2":
//       const productId = await rl.question("Please enter the product ID: ");
//       const quantity = await rl.question("Please enter the quantity: ");
//       const price = await rl.question("Please enter the price: ");
//       await cartController.addProductToCart(unit, productId, quantity, price);
//       break;
//     case "3":
//       const orders = await orderController.getOrdersByUnit(unit);
//       console.log(orders);
//       break;
//     case "4":
//       rl.close();
//       return;
//     default:
//       console.log("Invalid answer. Please try again.");
//       startShopping(unit);
//   }
// }

export default app;
