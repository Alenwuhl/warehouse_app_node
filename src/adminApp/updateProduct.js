import * as productsController from "../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });

export default async function updateProduct() {
  const productsNames = await productsController.getProductsNames();
  console.log("Products: ", productsNames);
  const chooseProduct = await rl.question(
    "Please enter the product name to update: "
  );
  const getProduct = await productsController.getProductByName(chooseProduct);
  if (getProduct) {
    console.log("This is the product: ", getProduct);
    const productID = getProduct._id;
    console.log("Please enter which think you want to update: ");
    console.log("1. title");
    console.log("2. description");
    console.log("3. price");
    console.log("4. category");
    console.log("5. stock");
    console.log("6. expiration date");
    let updateAttribute = await rl.question("- ");
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
      default:
    }
    if (updateAttribute === "category") {
      let newCategory = await rl.question(
        "Please enter the number of the new category between this options 1.weapons, 2.clothing, 3.electronics, 4.other: "
      );
      switch (newCategory) {
        case "1":
          newCategory = "weapons";
          break;
        case "2":
          newCategory = "clothing";
          break;
        case "3":
          newCategory = "electronics";
          break;
        case "4":
          newCategory = "other";
          break;
        default:
          const updateValue = await rl.question("Please enter the new value: ");
          const updateProduct = await productsController.updateProduct(
            productID,
            updateAttribute,
            updateValue
          );
          if (updateProduct) {
            console.log(`Product ${chooseProduct} updated successfully.`);
            await startAdminApp();
          } else {
            console.log(`Product ${chooseProduct} not updated, try again.`);
            await startAdminApp();
          }
      }
    } else {
      console.log(`Product ${chooseProduct} not found.`);
      await startAdminApp();
    }
  }
}
