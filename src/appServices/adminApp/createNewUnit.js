import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });

export default async function createNewProduct() {
  try {
    const unitName = await rl.question("Please enter the unit name: ");
    const unitBudget = await rl.question("Please enter the unit budget: ");
    newUnit = await unitsController.createUnit(unitName, unitBudget);
    if (newUnit) {
      console.log(`Unit ${unitName} created successfully.`);
      await startAdminApp();
    } else {
      console.log(`Unit ${unitName} could not be created.`);
      await startAdminApp();
    }
  } catch (error) {
    console.error(error);
    await startAdminApp();
  }
}
