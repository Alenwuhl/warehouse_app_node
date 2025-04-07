import * as productsController from "../../controllers/products.controller.js";
import rl from "../../config/readline.js"
import startShopping from "./shoppingApp.js";

export default async function buyAProduct(unit) {
    try {
        const products = await productsController.getAllProductsNamesAndIds();
        console.log(`This is the list of products: 
            ${products.map((p, i) => `${i + 1}. ${p.title} - ${p.price}`).join("\n")}`);
            let chooseProduct = await rl.question("- ");
        while (chooseProduct < 1 || chooseProduct > products.length) {
            console.log("Invalid choice. Please enter a valid number");
            console.log(`This is the list of products: 
                ${products.map((p, i) => `${i + 1}. ${p.title} - ${p.price}`).join("\n")}`);
            chooseProduct = await rl.question("- ");
        }
        chooseProduct = products[chooseProduct - 1].id;
        const quantity = await rl.question("Please enter the quantity you want to buy: ");
        // todo tomorrow
        const buyProduct = await productsController.buyAProduct(chooseProduct, quantity, unit);
        if (buyProduct) {
            console.log("You have successfully bought the product");
            await startShopping(unit);
        } else {
            console.log("You have not bought the product");
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }}
        