import startAdminApp from "./adminApp/adminApp.js";
import * as userController from "../controllers/users.controller.js";
import * as unitsController from "../controllers/units.controller.js";
import startShopping from "./userApp/shoppingApp.js";
import rl from "../config/readline.js"

export default async function displayMainMenu() {
  console.log("Welcome to the main menu!");
  console.log("1. Register as an admin");
  console.log("2. Register as a unit member");
  console.log("3. Login with your account");

  const answer = await rl.question("Please enter your answer: ");

  switch (answer) {
    case "1":
      const adminName = await rl.question("Please enter your username: ");

      if (!adminName) {
        console.log("Username is required, please try again.");
        await displayMainMenu();
        return;
      }
      const adminPassword = await rl.question("Please enter your password: ");
      if (!adminPassword) {
        console.log("Password is required, please try again.");
        await displayMainMenu();
        return;
      }

      const registerAdminResponse = await userController.registerAdmin(
        adminName,
        adminPassword
      );

      if (registerAdminResponse) {
        console.log(
          `You have registered as an admin with the username: ${adminName}`
        );
        console.log("You can now manage products, orders and units.");
        await startAdminApp();
      } else {
        console.log("Registration failed. Please try again.");
        await displayMainMenu();
      }
      break;
    case "2":
      const username = await rl.question("Please enter your username: ");
      const password = await rl.question("Please enter your password: ");
      const units = await unitsController.getUnits();
      console.log(`Please enter your unit: 
              ${units
                .map((unit, i) => `${i + 1}. ${unit.name}`)
                .join("\n")}`);
      let unit = await rl.question("- ");
  
      while (unit < 1 || unit > units.length) {
        console.log("Invalid choice. Please enter a valid number");
        console.log(`Please enter your unit: 
                ${units
                  .map((unit, i) => `${i + 1}. ${unit.title}`)
                  .join("\n")}`);
      }
      unit = units[unit - 1].id;

      const registerUserResponse = await userController.registerUser(username, password, unit);
      if (registerUserResponse) {
        console.log(
          `You have registered as a unit member with the username: ${username}`
        );
        console.log(`You have registered in the unit: ${unit}`);
        const unitBudget = await unitsController.returnUnitBudget(unit);
        console.log(`Your budget is: ${unitBudget}`);
        await startShopping(unit);
      } else {
        console.log("Registration failed. Please try again.");
        await displayMainMenu();
      }
      break;
    case "3":
      const loginName = await rl.question("Please enter your username: ");
      const loginPassword = await rl.question("Please enter your password: ");
      const loginResponse = await userController.loginUser(
        loginName,
        loginPassword
      );
      if (!loginResponse) {
        console.log("Login failed. Please check your credentials.");
        await displayMainMenu();
      } else {
        console.log(`Welcome back, ${loginResponse.user.username}!`);
          if (loginResponse.user.role === "admin") {
            console.log("You are logged in as an admin.");
            console.log("You can now manage products and units.");
            await startAdminApp();
          } else {
            const unitBudget = await unitsController.returnUnitBudget(loginResponse.user.unit);
            console.log("You are logged in as a unit member.");
            console.log( `Your unit budget is: $${unitBudget}`);
            console.log("You can now buy products from the store.");
            await startShopping(loginResponse.user.unit);
          };
      };
      break;
    default:
      console.log("Invalid answer. Please try again.");
      await displayMainMenu();
  };
};
