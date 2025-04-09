import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js";
import * as cartsController from "../../controllers/cart.controller.js";
import startShopping from "./shoppingApp.js";
import modifyMyOrder from "./modifyMyOrder.js";
import finishPurchase from "./finishPurchase.js";
import Product from "../../models/products.model.js";

export default async function buyAProduct(unit) {
  try {
    const products = await productsController.getProducts();
    console.log(
      `This is the list of products, choose which one you want to buy: `
    );
    console.log("------------------------------");

    console.log(
      `${products
        .map((p, i) => ` ${i + 1}. ${p.title} - $${p.price}`)
        .join("\n")}`
    );
    let chooseProduct = await rl.question("- ");
    while (chooseProduct < 1 || chooseProduct > products.length) {
      console.log("Invalid choice. Please enter a valid number");
      console.log(`This is the list of products: 
                ${products
                  .map((p, i) => `${i + 1}. ${p.title} - ${p.price}`)
                  .join("\n")}`);
      chooseProduct = await rl.question("- ");
    }
    chooseProduct = products[chooseProduct - 1];
    const quantityString = await rl.question(
      "Please enter the quantity you want to buy: "
    );
    const quantity = parseInt(quantityString);

    const cart = await cartsController.addProductToCart(
      chooseProduct.id,
      quantity,
      unit
    );

    if (cart) {
      console.log(
        `You've added ${quantity} of ${chooseProduct.title} to your cart`
      );
      console.log(`Now your cart is: `);
      console.log("------------------------------");
      console.log(`Order number: ${cart.orderNumber}`);
      console.log(`Status: ${cart.status}`);
      console.log("Items:");
      cart.items.forEach((item, index) => {
        console.log(
          `  ${index + 1}. Product ID: ${item.productId} - Quantity: ${
            item.quantity
          }`
        );
      });
      console.log(`Total Price: $${cart.totalPrice}`);
      console.log("------------------------------");

      console.log("What do you want to do?");
      console.log("1. Finish my order");
      console.log("2. Modify my order");
      console.log("3. Return to the menu");

      const answer = await rl.question("- ");

      switch (answer) {
        case "1":
          await finishPurchase(cart);
          break;
        case "2":
          await modifyMyOrder(cart, unit);
          break;
        case "3":
          await startShopping(unit);
          break;
        default:
          break;
      }
    } else {
      console.log("You have not added this product to your cart!");
      console.log("Returning to the menu...");
      await startShopping(unit);
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
