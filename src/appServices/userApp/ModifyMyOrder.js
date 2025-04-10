import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js";
import * as cartsController from "../../controllers/cart.controller.js";
import startShopping from "./shoppingApp.js";
import buyAProduct from "./buyAProduct.js";
import { logger } from "../../config/loggerCustom.js"

export default async function modifyMyOrder(cart) {
  try {
    console.log("This is your active order");
    console.log("------------------------------");
    logger.info(`Order number: ${cart.orderNumber}`);
    logger.info(`Status: ${cart.status}`);
    logger.info("Items:");
    const products = await productsController.getProductsbyIds(cart);
    cart.items.forEach((item, index) => {
      const product = products.find((p) => p.id === item.productId);
      logger.info(
        `  ${index + 1}. Title: ${product.title} - Quantity:${item.quantity}`
      );
    });
    console.log("------------------------------");
    console.log("Do you want to modify your order?");
    logger.http("1. Yes");
    logger.fatal("2. No");
    let answer = await rl.question("- ");

    while (answer !== "1" && answer !== "2") {
      console.log("Invalid answer. Please try again.");
      answer = await rl.question("- ");
    }

    if (answer === "1") {
      console.log("What do you want to do?");
      logger.info("1. Add a product");
      logger.info("2. Delete a product");
      const answer2 = await rl.question("- ");
      if (answer2 === "1") {
        await buyAProduct(cart.unitId);
      } else if (answer2 === "2") {
        logger.info(
          cart.items
            .map((item, i) => {
              const product = products.find((p) => p.id === item.productId);
              return `${i + 1}. ${product.title}`;
            })
            .join("\n")
        );
        let productId = await rl.question(
          "Please enter the product you want to delete: "
        );
        while (productId < 1 || productId > cart.items.length) {
          logger.fatal("Invalid choice. Please enter a valid number");
          logger.info(
            cart.items
              .map((item, i) => {
                const product = products.find((p) => p.id === item.productId);
                return `${i + 1}. ${product.title}`;
              })
              .join("\n")
          );
          productId = await rl.question("Please enter the product you want to delete: ");
        }
        productId = cart.items[productId - 1].productId;

        await cartsController.deleteProductFromCart(productId, cart.id);
        const product = await productsController.getProductById(productId)
        logger.http("Product deleted from your order");
        const totalPrice = cart.totalPrice - product.price
        await cartsController.updateCart(cart.id, {totalPrice: totalPrice} )
        if (cart.items.length <= 1) {
          await cartsController.deleteCart(cart.id)
        }
        await startShopping(cart.unitId);
      } else {
        logger.fatal("Invalid choice. Please try again.");
      }
    } else if (answer === "2") {
      console.log("You have chosen not to modify your order.");
      await startShopping(cart.unitId);
    } else {
      logger.fatal("Invalid choice. Please try again.");
      
    }
  } catch (error) {
    console.error(error);
    logger.fatal("Error modifying your order:", error.message);
    logger.fatal("Please try again.");
    await startShopping(cart.unitId);
  }
}
