import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";

export default async function deleteProduct() {
  try {
    const products = await productsController.getAllProductsNamesAndIds();
    console.log(`Please enter the product name to delete: 
    ${products.map((product, i) => `${i + 1}. ${product.title}`).join("\n")}`);

    let productIdToDelete = await rl.question("- ");

    while (productIdToDelete < 1 || productIdToDelete > products.length) {
      console.log("Invalid choice. Please enter a valid number");
      console.log(`Please enter the product name to delete: 
        ${products
          .map((product, i) => `${i + 1}. ${product.title}`)
          .join("\n")}`);
    }

    productIdToDelete = products[productIdToDelete - 1].id;

    const deleteProduct = await productsController.deleteProduct(productIdToDelete);
    if (deleteProduct) {
      console.log("Product deleted successfully");
      startAdminApp();
    } else {
      console.log("Error deleting product");
      await deleteProduct();
    }
  } catch (error) {
    console.log("Error deleting product");
    await startAdminApp();
  }
}
