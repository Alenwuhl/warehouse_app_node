import viewAllProducts from "./viewAllProducts.js";
import * as productsController from "../../controllers/products.controller.js";
import * as cartController from "../../controllers/cart.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";

export default async function getOrderByProduct(productId) {
  try {
    const products = await productsController.getAllProductsNamesAndIds();
    if (!products) {
      console.log("No products found");
      return;
    }
    console.log("Products: ");
    console.log(
      products
        .map((product, i) => {
          return `
            ${i + 1}. ${product.title}`;
        })
        .join("\n")
    );

const productId = '67f3b86568b07355a681139a'

    const orders = await cartController.getOrderByProductId(productId);
    if (!orders) {
      console.log("No orders found");
    }
    console.log("Orders: ");
    console.log(
      orders
        .map((order) => {
          return `
          Order ID: ${order.id}
          Unit: ${order.unitId}
          Status: ${order.status}
    ---------------------------`;
        })
        .join("\n")
    );
    let enter = await rl.question("Press enter to return to the menu...");
    while (enter !== "") {
      enter = await rl.question("Press enter to return to the menu...");
    }
    if (enter === "") {
      await startAdminApp();
    }
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
