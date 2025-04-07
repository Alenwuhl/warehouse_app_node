import * as productsController from "../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });

export default async function findProductsByCategory() {
  try {
    console.log("Choose a category: ");
    console.log("1. weapons");
    console.log("2. clothing");
    console.log("3. electronics");
    console.log("4. other");
    let category = await rl.question("- ");
    switch (category) {
      case "1":
        category = "weapons";
        break;
      case "2":
        category = "clothing";
        break;
      case "3":
        category = "electronics";
        break;
      case "4":
        category = "other";
        break;
      default:
    }
    const products = await productsController.findProductsByCategory(category);
    if (products) {
      console.log(`Products with category ${category}: `, products);
      const enter = await rl.question("Press enter to return to the menu...");
      if (enter === "") {
        await startAdminApp();
      }
    } else {
      console.log("No products found with this category");
      const enter = await rl.question("Press enter to return to the menu...");
      if (enter === "") {
        await startAdminApp();
      }
    }
  } catch (error) {
    console.error(error);
    await startAdminApp();
  }
}
