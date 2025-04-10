import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"

export default async function updateProduct() {
  const products = await productsController.getProducts();
  logger.info(`Please enter the product name to update: 
  ${products.map((p, i) => `${i + 1}. ${p.title}`).join("\n")}`);
  let chooseProduct = await rl.question("- ");
  while (chooseProduct < 1 || chooseProduct > products.length) {
    logger.fatal("Invalid choice. Please enter a valid number");
    logger.info(`Please enter the product name to update: 
      ${products.map((p, i) => `${i + 1}. ${p.title}`).join("\n")}`);
  }
  chooseProduct = products[chooseProduct - 1];

  if (chooseProduct) {
    logger.info("This is the product: ");
    console.log("----------------------------------------");
    logger.info(`Title: ${chooseProduct.title}`);
    logger.info(`Description: ${chooseProduct.description}`);
    logger.info(`Price: ${chooseProduct.price}`);
    logger.info(`Category: ${chooseProduct.category}`);
    logger.info(`Stock: ${chooseProduct.stock}`);
    logger.info(`Expiration date: ${chooseProduct.expirationDate}`);
    logger.info(`Status: ${chooseProduct.status}`);
    console.log("----------------------------------------");

    console.log("Please enter which think you want to update: ");
    logger.info("1. title");
    logger.info("2. description");
    logger.info("3. price");
    logger.info("4. category");
    logger.info("5. stock");
    logger.info("6. expiration date");
    logger.info("7. status");

    let updateAttribute = await rl.question("- ");

    while (
      updateAttribute < 1 ||
      updateAttribute > 7 ||
      isNaN(updateAttribute)
    ) {
      logger.fatal("Invalid choice. Please enter a valid number");
      updateAttribute = await rl.question("- ");
    }

    switch (updateAttribute) {
      case "1":
        updateAttribute = "title";
        break;
      case "2":
        updateAttribute = "description";
        break;
      case "3":
        updateAttribute = "price";
        break;
      case "4":
        updateAttribute = "category";
        break;
      case "5":
        updateAttribute = "stock";
        break;
      case "6":
        updateAttribute = "expirationDate";
        break;
      case "7":
        updateAttribute = "status";
        break;
      default:
    }
    if (updateAttribute === "expirationDate") {
      logger.info("Please enter the new expiration year:");
      let expirationYear = await rl.question("- ");
      logger.info("Please enter the new expiration month:");
      let expirationMonth = await rl.question("- ");
      logger.info("Please enter the new expiration day:");
      let expirationDay = await rl.question("- ");
      if (
        isNaN(expirationYear) ||
        isNaN(expirationMonth) ||
        isNaN(expirationDay)
      ) {
        logger.fatal("Invalid date. Please enter a valid date.");
        await updateProduct();
      }
      expirationYear = parseInt(expirationYear);
      expirationMonth = parseInt(expirationMonth);
      expirationDay = parseInt(expirationDay);
      const expirationDate = new Date(
        expirationYear,
        expirationMonth - 1,
        expirationDay
      );
      if (isNaN(expirationDate.getTime())) {
        logger.fatal("Invalid date. Please enter a valid date.");
        await updateProduct();
      }      
      const updatedProduct = await productsController.updateProduct(
        chooseProduct,
        updateAttribute,
        expirationDate
      );
      if (updatedProduct) {
        logger.http(`Product ${chooseProduct} has been updated successfully.`);
        await startAdminApp();
      } else {
        logger.fatal(`Failed to update product ${chooseProduct}.`);
        await updateProduct();
      }
    } else if (updateAttribute === "category") {
      console.log(
        "Please enter the number of the product category, you can choose between:"
      );
      logger.info("1. weapons");
      logger.info("2. clothing");
      logger.info("3. electronics");
      logger.info("4. other");
      let productCategory = await rl.question("- ");
      while (
        productCategory !== "1" &&
        productCategory !== "2" &&
        productCategory !== "3" &&
        productCategory !== "4"
      ) {
        console.log("Please enter a valid category number (1-4):");
        logger.info("1. weapons");
        logger.info("2. clothing");
        logger.info("3. electronics");
        logger.info("4. other");
        productCategory = await rl.question("- ");
      }
      switch (productCategory) {
        case "1":
          productCategory = "weapons";
          break;
        case "2":
          productCategory = "clothing";
          break;
        case "3":
          productCategory = "electronics";
          break;
        case "4":
          productCategory = "other";
          break;
        default:
      }
      const updatedProduct = await productsController.updateProduct(
        chooseProduct,
        updateAttribute,
        productCategory
      );
      if (updatedProduct) {
        logger.http(`Product ${chooseProduct} has been updated successfully.`);
      } else {
        logger.info(`Failed to update product ${chooseProduct}.`);
        await startAdminApp();
      }
    } else if (updateAttribute === "status") {
      if (chooseProduct.status === "Defective product") {
        logger.fatal("You cannot update the status of a defective product.");
        logger.info("Try creating a new product instead.");
        await startAdminApp();
      } else {
        console.log('Do you want to change the status to "Defective product"?');
        logger.info("1. Yes");
        logger.info("2. No");
        let changeStatus = await rl.question("- ");
        while (changeStatus !== "1" && changeStatus !== "2") {
          logger.fatal("Please enter a valid option (1-2):");
          logger.info("1. Yes");
          logger.info("2. No");
          changeStatus = await rl.question("- ");
        }
        switch (changeStatus) {
          case "1":
            changeStatus = "Defective product";
            break;
          case "2":
            logger.fatal("Status not changed");
            await updateProduct();
            break;
          default:
        }
        const updatedProduct = await productsController.updateProduct(
          chooseProduct,
          updateAttribute,
          changeStatus
        );
        if (updatedProduct) {
          logger.http(
            `Product ${chooseProduct.title} has been updated successfully.`
          );
          await startAdminApp();
        } else {
          logger.fatal(`Failed to update product ${chooseProduct}.`);
          await updateProduct();
        }
      }
    } else {
      const newValue = await rl.question("Please enter the new value: ");
      const updatedProduct = await productsController.updateProduct(
        chooseProduct,
        updateAttribute,
        newValue
      );
      if (updatedProduct) {
        logger.http(`The product has been updated successfully.`);
        console.log("The new product is: ");
        console.log("----------------------------------------");
        logger.info(`Title: ${updatedProduct.title}`);
        logger.info(`Description: ${updatedProduct.description}`);
        logger.info(`Price: ${updatedProduct.price}`);
        logger.info(`Category: ${updatedProduct.category}`);
        logger.info(`Stock: ${updatedProduct.stock}`);
        logger.info(`Expiration date: ${updatedProduct.expirationDate}`);
        logger.info(`Status: ${updatedProduct.status}`);
        console.log("----------------------------------------");
        await startAdminApp();
      } else {
        logger.fatal(`Failed to update product ${chooseProduct}.`);
        await updateProduct();
      }
    }
  }
}
