import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js";
import * as cartsController from "../../controllers/cart.controller.js";
import startShopping from "./shoppingApp.js";
import modifyMyOrder from "./modifyMyOrder.js";
import finishPurchase from "./finishPurchase.js";
import { logger } from "../../config/loggerCustom.js";

export default async function buyAProduct(unit) {
  try {
    const products = await productsController.getProducts();
    logger.http(
      `This is the list of products, choose which one you want to buy: `
    );
    console.log("------------------------------");

    logger.info(
      `${products
        .map((p, i) => ` ${i + 1}. ${p.title} - $${p.price}`)
        .join("\n")}`
    );
    let chooseProduct = await rl.question("- ");
    while (chooseProduct < 1 || chooseProduct > products.length) {
      logger.fatal("Invalid choice. Please enter a valid number");
      logger.http(`This is the list of products: 
                ${products
                  .map((p, i) => `${i + 1}. ${p.title} - ${p.price}`)
                  .join("\n")}`);
      chooseProduct = await rl.question("- ");
    }
    chooseProduct = products[chooseProduct - 1];
    let quantityString = await rl.question(
      "Please enter the quantity you want to buy: "
    );
    let quantity = parseInt(quantityString);
    console.log(quantity);

    while (!quantity) {
      logger.fatal("That is not a number!");
      quantityString = await rl.question(
        "Please enter the quantity you want to buy: "
      );
      quantity = parseInt(quantityString);
    }
    const cart = await cartsController.addProductToCart(
      chooseProduct.id,
      quantity,
      unit
    );

    if (cart) {
      logger.http(
        `You've added ${quantity} of ${chooseProduct.title} to your cart`
      );
      logger.http(`Now your cart is: `);
      console.log("------------------------------");
      logger.info(`Order number: ${cart.orderNumber}`);
      logger.info(`Status: ${cart.status}`);
      logger.info("Items:");
      cart.items.forEach((item, index) => {
        logger.info(
          `  ${index + 1}. Product ID: ${item.productId} - Quantity: ${
            item.quantity
          }`
        );
      });
      logger.info(`Total Price: $${cart.totalPrice}`);
      console.log("------------------------------");

      console.log("What do you want to do?");
      logger.info("1. Finish my order");
      logger.info("2. Modify my order");
      logger.info("3. Return to the menu");

      const answer = await rl.question("- ");

      while (answer !== "1" && answer !== "2" && answer !== "3") {
        logger.fatal("Invalid answer. Please try again.");
        answer = await rl.question("- ");
      }
      switch (answer) {
        case "1":
          await finishPurchase(cart);
          break;
        case "2":
          await modifyMyOrder(cart);
          break;
        case "3":
          await startShopping(unit);
          break;
        default:
          break;
      }
    } else {
      logger.fatal("You have not added this product to your cart!");
      console.log("Returning to the menu...");
      await startShopping(unit);
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
