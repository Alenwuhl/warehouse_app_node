import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = createInterface({ input, output });

// to do it tomorrow
export default async function startShopping(unit) {
  console.log("Welcome to the store!");
  console.log("1. View products");
  console.log("2. Buy a product");
  console.log("3. View your orders");
  console.log("4. Exit");

  // const answer = await rl.question("Please enter your answer: ");
  
  // switch (answer) {
  //   case "1":
  //     const products = await productController.getAllProducts();
  //     console.log(products);
  //     break;
  //   case "2":
  //     const productId = await rl.question("Please enter the product ID: ");
  //     const quantity = await rl.question("Please enter the quantity: ");
  //     const price = await rl.question("Please enter the price: ");
  //     await cartController.addProductToCart(unit, productId, quantity, price);
  //     break;
  //   case "3":
  //     const orders = await orderController.getOrdersByUnit(unit);
  //     console.log(orders);
  //     break;
  //   case "4":
  //     rl.close();
  //     return;
  //   default:
  //     console.log("Invalid answer. Please try again.");
  //     startShopping(unit);
  // }
}