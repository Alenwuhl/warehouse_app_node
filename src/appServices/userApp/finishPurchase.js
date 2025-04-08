import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js";
import * as cartsController from "../../controllers/cart.controller.js";
import * as unitController from "../../controllers/units.controller.js";
import Product from "../../models/products.model.js";
import modifyMyOrder from "./modifyMyOrder.js";
import startShopping from "./shoppingApp.js";

export default async function finishPurchase(cart) {
      try {
        const unit = await unitController.getUnitById(cart.unitId);
        if (unit.budget < cart.totalPrice) {
          console.log("You don't have enough budget to complete this order.");
          console.log("You will need to modify your order.");
          await modifyMyOrder(cart, unit);
          return;
        }
        let conditions = cart.items.map((i) => {
          return {
            id: i.productId,
            status: "Working product"
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
          1
          console.log("Please modify your order.");
          await modifyMyOrder(unit);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
    
