import startAdminApp from "./adminApp/adminApp.js";
import * as userController from "../controllers/users.controller.js";
import * as unitsController from "../controllers/units.controller.js";
import startShopping from "./userApp/shoppingApp.js";
import { logger } from "../config/loggerCustom.js"
import rl from "../config/readline.js"

export default async function displayMainMenu() {
  logger.http("Welcome to the main menu!");
  logger.info("1. Register as an admin");
  logger.info("2. Register as a unit member");
  logger.info("3. Login with your account");

  let answer = await rl.question("Please enter your answer: ");
  while (answer !== "1" && answer !== "2" && answer !== "3") {
    logger.fatal("That is not an option!")
    logger.fatal("Your options are 1, 2 or 3!")
    logger.info("1. Register as an admin");
    logger.info("2. Register as a unit member");
    logger.info("3. Login with your account");
    answer = await rl.question("- ");
  }

  switch (answer) {
    case "1":
      const adminName = await rl.question("Please enter your username: ");

      if (!adminName) {
        logger.fatal("Username is required, please try again.");
        await displayMainMenu();
        return;
      }
      const adminPassword = await rl.question("Please enter your password: ");
      if (!adminPassword) {
        logger.fatal("Password is required, please try again.");
        await displayMainMenu();
        return;
      }

      const registerAdminResponse = await userController.registerAdmin(
        adminName,
        adminPassword
      );

      if (registerAdminResponse) {
        logger.info(
          `You have registered as an admin with the username: ${adminName}`
        );
        logger.info("You can now manage products, orders and units.");
        await startAdminApp();
      } else {
        logger.fatal("Registration failed. Please try again.");
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
        logger.fatal("Invalid choice. Please enter a valid number");
        console.log(`Please enter your unit: 
                ${units
                  .map((unit, i) => `${i + 1}. ${unit.title}`)
                  .join("\n")}`);
      }
      unit = units[unit - 1].id;

      const registerUserResponse = await userController.registerUser(username, password, unit);
      if (registerUserResponse) {
        logger.info(
          `You have registered as a unit member with the username: ${username}`
        );
        logger.info(`You have registered in the unit: ${unit}`);
        const unitBudget = await unitsController.returnUnitBudget(unit);
        logger.info(`Your budget is: ${unitBudget}`);
        await startShopping(unit);
      } else {
        logger.fatal("Registration failed. Please try again.");
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
        logger.fatal("Login failed. Please check your credentials.");
        await displayMainMenu();
      } else {
        logger.http(`Welcome back, ${loginResponse.user.username}!`);
          if (loginResponse.user.role === "admin") {
            logger.info("You are logged in as an admin.");
            logger.info("You can now manage products and units.");
            await startAdminApp();
          } else {
            const unitBudget = await unitsController.returnUnitBudget(loginResponse.user.unit);
            logger.info("You are logged in as a unit member.");
            logger.info( `Your unit budget is: $${unitBudget}`);
            logger.info("You can now buy products from the store.");
            await startShopping(loginResponse.user.unit);
          };
      };
      break;
    default:
      logger.fatal("Invalid answer. Please try again.");
      await displayMainMenu();
  };
};
