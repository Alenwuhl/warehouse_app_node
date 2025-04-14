import * as cartsController from "../../controllers/cart.controller.js";
import * as unitController from "../../controllers/units.controller.js";
import * as productsController from "../../controllers/products.controller.js"
import Product from "../../models/products.model.js";
import modifyMyOrder from "./modifyMyOrder.js";
import startShopping from "./shoppingApp.js";
import { logger } from "../../config/loggerCustom.js"

export default async function finishPurchase(cart) {
      try {
        const unit = await unitController.getUnitById(cart.unitId);
        
        if (unit.budget <= cart.totalPrice) {
          logger.fatal("You don't have enough budget to complete this order.");
          logger.fatal("You will need to modify your order.");
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
        // i need to move this
        const products = await Product.find({ $or: conditions });
        
        if (products.length === cart.items.length) {
          cart.status = "completed";
          unit.budget = unit.budget - cart.totalPrice
          await cartsController.updateCart(cart._id, cart);
          await unitController.updateUnitBudget(unit.id, unit.budget)
          logger.http("Your order has been completed!");
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
          await startShopping(unit.id)
        } else {
          let unavailableProductsIds = cart.items.filter((i) => {
            return !products.some((product) => product._id.equals(i.productId));
          });
          let unavailableProducts = await productsController.getProductsbyIds(unavailableProductsIds)
          console.log("The following products are not available:");
          unavailableProducts.forEach((item, index) => {
            logger.fatal(
              `  ${index + 1}. Product ID: ${item.productId} - Quantity: ${
                item.quantity
              }`
            );
          });
          console.log("Please modify your order.");
          await modifyMyOrder(cart);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
    
