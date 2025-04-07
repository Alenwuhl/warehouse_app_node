import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";

export default async function updateUnit() {
  try {
    const units = await unitsController.getUnits();
    console.log(`Please enter the unit to update: 
            ${units
              .map((unit, i) => `${i + 1}. ${unit.name} - ${unit.budget}`)
              .join("\n")}`);
    let unitIdToUpdate = await rl.question("- ");

    while (unitIdToUpdate < 1 || unitIdToUpdate > units.length) {
      console.log("Invalid choice. Please enter a valid number");
      console.log(`Please enter the product name to update: 
              ${units
                .map((unit, i) => `${i + 1}. ${unit.title} - ${unit.budget}`)
                .join("\n")}`);
    }
    unitIdToUpdate = units[unitIdToUpdate - 1].id;
    console.log("Please enter the new budget");
    let newBudget = await rl.question("- ");

    const updateUnit = await unitsController.updateUnitBudget(
      unitIdToUpdate,
      newBudget
    );
    if (updateUnit) {
      console.log("Unit updated successfully");
      await startAdminApp()
    } else {
      console.log("Failed to update unit");
      await updateUnit()
    }
  } catch (error) {
    console.log("Error updating unit");
    await updateUnit();
  }
}
