import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });

export default async function deleteProduct() {
  
    const productNameToDelete = await rl.question(
        "Please enter the product name to delete: "
      );
      const deleteProduct = await productsController.deleteProduct(
        productNameToDelete
      );
      if (deleteProduct) {
        console.log(`Product ${productNameToDelete} deleted successfully.`);
        await startAdminApp();
      } else {
        console.log(
          `Product ${productNameToDelete} not found or could not be deleted.`
        );
        await startAdminApp();
      }
}