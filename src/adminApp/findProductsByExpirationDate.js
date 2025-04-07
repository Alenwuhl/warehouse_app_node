import * as productsController from "../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });

export default async function findProductsByExpirationDate() {
    try {
        console.log("Enter a date and you will get all products that will be expired on that date");
        const year = await rl.question("Enter a year: ");
        const month = await rl.question("Enter a month: ");
        const day = await rl.question("Enter a day: ");
        const date = { year, month, day };
        const products = await productsController.findProductsByExpirationDate(date);

        if(products) {
            console.log("Al this products will be expired on this date", products);
                const enter = await rl.question(
                  "Press enter to return to the menu..."
                );
                if (enter === "") {
                  await startAdminApp();
                }
        }
        } catch (error) {
            console.log(error);
            await startAdminApp();
            }
}