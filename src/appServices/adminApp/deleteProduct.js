import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"

export default async function deleteProduct() {
  try {
    const products = await productsController.getAllProductsNamesAndIds();
    logger.info(`Please enter the product name to delete: 
    ${products.map((product, i) => `${i + 1}. ${product.title}`).join("\n")}`);

    let productIdToDelete = await rl.question("- ");

    while (productIdToDelete < 1 || productIdToDelete > products.length) {
      logger.fatal("Invalid choice. Please enter a valid number");
      logger.info(`Please enter the product name to delete: 
        ${products
          .map((product, i) => `${i + 1}. ${product.title}`)
          .join("\n")}`);
    }

    productIdToDelete = products[productIdToDelete - 1].id;

    const deleteProduct = await productsController.deleteProduct(productIdToDelete);
    if (deleteProduct) {
      logger.http("Product deleted successfully");
      startAdminApp();
    } else {
      logger.fatal("Error deleting product");
      await deleteProduct();
    }
  } catch (error) {
    logger.fatal("Error deleting product");
    await startAdminApp();
  }
}
