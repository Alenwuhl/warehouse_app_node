import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });

export default async function createNewProduct() {
  const productName = await rl.question("Please enter the product name: ");
  const productDescription = await rl.question(
    "Please enter the product description: "
  );
  console.log("Please enter the number of the product category, you can choose between:");
  console.log("1. weapons");
  console.log("2. clothing");
  console.log("3. electronics");
  console.log("4. other");
  let productCategory = await rl.question("- ");
  while (productCategory !== "1" && productCategory !== "2" && productCategory !== "3" && productCategory !== "4") {
    console.log("Please enter a valid category number (1-4):");
    console.log("1. weapons");
    console.log("2. clothing");
    console.log("3. electronics");
    console.log("4. other");
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
    console.log(`Product ${productName} created successfully.`);
    await startAdminApp();
  } else {
    console.log(`Product ${productName} not created, try again.`);
    await startAdminApp();
  }
}
