import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"

export default async function updateUnit() {
  try {
    const units = await unitsController.getUnits();
    logger.info(`Please enter the unit to update: \n${units
              .map((unit, i) => `${i + 1}. ${unit.name} - ${unit.budget}`)
              .join("\n")}`);
    let unitIdToUpdate = await rl.question("- ");

    while (unitIdToUpdate < 1 || unitIdToUpdate > units.length) {
      logger.fatal("Invalid choice. Please enter a valid number");
      logger.info(`Please enter the product name to update: 
              ${units
                .map((unit, i) => `${i + 1}. ${unit.title} - ${unit.budget}`)
                .join("\n")}`);
    }
    unitIdToUpdate = units[unitIdToUpdate - 1].id;
    logger.info("Please enter the new budget");
    let newBudget = await rl.question("- ");

    const updateUnit = await unitsController.updateUnitBudget(
      unitIdToUpdate,
      newBudget
    );
    if (updateUnit) {
      logger.http("Unit updated successfully");
      await startAdminApp()
    } else {
      logger.fatal("Failed to update unit");
      await updateUnit()
    }
  } catch (error) {
    logger.fatal("Error updating unit");
    await updateUnit();
  }
}
