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
        if (unit.budget <= cart.totalPrice) {
          console.log("You don't have enough budget to complete this order.");
          console.log("You will need to modify your order.");
          await modifyMyOrder(cart);
          return;
        }
        const conditions = cart.items.map((i) => {
          return {
            _id: i.productId,
            stock: { $gte: i.quantity },
            status: "Working product", 
          };
        });
        
        const products = await Product.find({ $or: conditions });
        
        if (products.length === cart.items.length) {
          cart.status = "completed";
          await cartsController.updateCart(cart._id, cart);
          console.log("Your order has been completed!");
          //updeteo stock
          products.map((product) => {
            const cartItem = cart.items.find((i) =>
              i.productId === product._id.toString()
            );
            if (cartItem) {
              product.stock -= cartItem.quantity;
              product.save();
            }
          });
        } else {
          let unavailableProducts = cart.items.filter((i) => {
            return !products.some((product) => product._id.equals(i.productId));
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
          
          await modifyMyOrder(cart);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
    
