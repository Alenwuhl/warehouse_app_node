import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js";
import * as cartsController from "../../controllers/cart.controller.js";
import startShopping from "./shoppingApp.js";
import buyAProduct from "./buyAProduct.js";

export default async function modifyMyOrder(cart) {
  try {
    console.log("This is your active order");
    console.log("------------------------------");
    console.log(`Order number: ${cart.orderNumber}`);
    console.log(`Status: ${cart.status}`);
    console.log("Items:");
    const products = await productsController.getProductsbyIds(cart);
    cart.items.forEach((item, index) => {
      const product = products.find((p) => p.id === item.productId);
      console.log(
        `  ${index + 1}. Title: ${product.title} - Quantity:${item.quantity}`
      );
    });
    console.log("------------------------------");
    console.log("Do you want to modify your order?");
    console.log("1. Yes");
    console.log("2. No");
    const answer = await rl.question("- ");

    if (answer === "1") {
      console.log("What do you want to do?");
      console.log("1. Add a product");
      console.log("2. Delete a product");
      const answer2 = await rl.question("- ");
      if (answer2 === "1") {
        await buyAProduct(cart.unitId);
      } else if (answer2 === "2") {
        console.log(
          cart.items
            .map((item, i) => {
              const product = products.find((p) => p.id === item.productId);
              return `${i + 1}. ${product.title}`;
            })
            .join("\n")
        );
        let productId = await rl.question(
          "Please enter the product you want to delete: "
        );
        while (productId < 1 || productId > cart.items.length) {
          console.log("Invalid choice. Please enter a valid number");
          console.log(
            cart.items
              .map((item, i) => {
                const product = products.find((p) => p.id === item.productId);
                return `${i + 1}. ${product.title}`;
              })
              .join("\n")
          );
          productId = await rl.question("Please enter the product you want to delete: ");
        }
        productId = cart.items[productId - 1].productId;

        await cartsController.deleteProductFromCart(productId, cart.id);
        console.log("Product deleted from your order");
        await startShopping(cart.unitId);
      } else {
        console.log("Invalid choice. Please try again.");
      }
    } else if (answer === "2") {
      console.log("You have chosen not to modify your order.");
      await startShopping(cart.unitId);
    } else {
      console.log("Invalid choice. Please try again.");
    }
  } catch (error) {
    console.error(error);
    console.log("Error modifying your order:", error.message);
    console.log("Please try again.");
    await startShopping(cart.unitId);
  }
}
