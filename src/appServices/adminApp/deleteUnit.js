import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"

export default async function deleteUnit() {
  try {
    const units = await unitsController.getUnits();
    logger.info(`Please enter the unit to delete: 
            ${units.map((unit, i) => `${i + 1}. ${unit.name}`).join("\n")}`);
    let unitIdToDelete = await rl.question("- ");

    while (unitIdToDelete < 1 || unitIdToDelete > units.length) {
      logger.fatal("Invalid choice. Please enter a valid number");
      logger.info(`Please enter the product name to delete: 
              ${units.map((unit, i) => `${i + 1}. ${unit.title}`).join("\n")}`);
    }
    unitIdToDelete = units[unitIdToDelete - 1].id;
    const deleteUnit = await unitsController.deleteUnit(unitIdToDelete);
    

    if (deleteUnit) {
      logger.http("Unit deleted successfully");
      await startAdminApp();
    } else {
      logger.fatal("Failed to delete unit");
      await deleteUnit();
    }
  } catch (error) {
    logger.fatal("Error deleting unit");
    await deleteUnit();
  }
}
