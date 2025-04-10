import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js"
import { logger } from "../../config/loggerCustom.js"

export default async function createNewProduct() {
  const productName = await rl.question("Please enter the product name: ");
  const productDescription = await rl.question(
    "Please enter the product description: "
  );
  console.log("Please enter the number of the product category, you can choose between:");
  logger.info("1. weapons");
  logger.info("2. clothing");
  logger.info("3. electronics");
  logger.info("4. other");
  let productCategory = await rl.question("- ");
  while (productCategory !== "1" && productCategory !== "2" && productCategory !== "3" && productCategory !== "4") {
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

  const productPrice = await rl.question("Please enter the product price: ");
  const productStock = await rl.question("Please enter the product stock: ");
  const productExpirationYear = await rl.question(
    "Please enter the product expiration year: "
  );
  const productExpirationMonth = await rl.question(
    "Please enter the product expiration month: "
  );
  const productExpirationDay = await rl.question(
    "Please enter the product expiration day: "
  );

  const newProduct = await productsController.createProduct(
    productName,
    productDescription,
    productPrice,
    productStock,
    productCategory,
    productExpirationYear,
    productExpirationMonth,
    productExpirationDay
  );
  if (newProduct) {
    logger.http(`Product ${productName} created successfully.`);
    await startAdminApp();
  } else {
    logger.fatal(`Product ${productName} not created, try again.`);
    await startAdminApp();
  }
}
