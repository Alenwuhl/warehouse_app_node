import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js"

export default async function createNewProduct() {
  try {
    const unitName = await rl.question("Please enter the unit name: ");
    const unitBudget = await rl.question("Please enter the unit budget: ");
    const newUnit = await unitsController.createUnit(unitName, unitBudget);
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
