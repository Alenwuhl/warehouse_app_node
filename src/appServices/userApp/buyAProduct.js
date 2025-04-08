import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js";
import * as cartsController from "../../controllers/cart.controller.js";
import startShopping from "./shoppingApp.js";
import modifyMyOrder from "./ModifyMyOrder.js";
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

    const cartId = await cartsController.addProductToCart(
      chooseProduct.id,
      quantity,
      unit
    );

    if (cartId) {
      const cart = await cartsController.getCartById(cartId);
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

async function finishPurchase(cart) {
  try {
    const unit = await cartsController.getUnitById(cart.unitId);
    if (unit.budget < cart.totalPrice) {
      console.log("You don't have enough budget to complete this order.");
      console.log("You will need to modify your order.");
      await modifyMyOrder(cart, unit);
      return;
    }
    let conditions = cart.items.map((i) => {
      return {
        _id: i.productId,
        stock: { $gte: i.quantity },
        status: "Working product",
      };
    });
    let p = await Product.find({ $and: conditions });
    if (p.length === cart.items.length) {
      cart.status = "completed";
      await cartsController.updateCart(cart._id, cart);
      console.log("Your order has been completed!");
      //updeteo stock
      p.map((product) => {
        product.stock -= cart.items.find((i) =>
          i.productId.equals(product._id)
        ).quantity;
        product.save();
      });
    } else {
      let unavailableProducts = cart.items.filter((i) => {
        return !p.some((product) => product._id.equals(i.productId));
      });
      console.log("The following products are not available:");
      unavailableProducts.forEach((item, index) => {
        console.log(
          `  ${index + 1}. Product ID: ${item.productId} - Quantity: ${
            item.quantity
          }`
        );
      });
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
