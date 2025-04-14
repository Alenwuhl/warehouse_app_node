import express from "express";
import dotenv from "dotenv";
import "./config/mongo.config.js";
import displayMainMenu from "./appServices/displayMenu.js";
import { logger } from "./config/loggerCustom.js"
import rl from "./config/readline.js";

dotenv.config();

const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.listen(port);

startServer();

async function startServer() {
  logger.info("Do you know the rules?");
  logger.http("1. Yes, I know the rules.");
  logger.fatal("2. No, I don't know the rules.");

  let answer = await rl.question("Please enter your answer: ");
  while (answer !== "1" && answer !== "2") {
    logger.fatal("That is not an option!")
    answer = await rl.question("- ");
  }


  if (answer === "1") {
    logger.http("Great! Let's start.");
    await displayMainMenu();
    rl.close();
  } else if (answer === "2") {
    console.log("Please read the rules before proceeding.");
    console.log(
      "- If you are a unit member, you can only see your own unit's budget."
    );
    console.log("- You can buy products from the store.");
    console.log("- You can only buy products if you have enough budget.");
    console.log("- You can modify your order until it is completed.");
    console.log("- You can only see your own active order.");
    console.log(
      "----------------------------------------------------------------"
    );
    console.log("If you are an admin, you can see all the products and units.");
    console.log("- You can also create, update and delete products.");
    console.log("- You can also create, update and delete units.");
    console.log(
      "- You can find the orders by order number, status or for an specific product."
    );
    console.log(
      "- You can find products by category, by defective product or by expiration date."
    );

    logger.info("This is the end of the rules, do you want to continue?");
    logger.http("1. Yes, I want to continue.");
    logger.fatal("2. No, I don't want to continue.");
    const continueAnswer = await rl.question("Please enter your answer: ");
    if (continueAnswer === "1") {
      logger.http("Great! Let's start.");
      await displayMainMenu();
    } else if (continueAnswer === "2") {
      return;
    } else {
      console.log("Invalid answer. Please try again.");
      await startServer();
    }
  } else {
    console.log("Invalid answer. Please try again.");
    await startServer();
  }
}

export default app;
