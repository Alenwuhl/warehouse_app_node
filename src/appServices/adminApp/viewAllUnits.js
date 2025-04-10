import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import { logger } from "../../config/loggerCustom.js"

export default async function viewAllUnits() {
  try {
    const units = await unitsController.getUnits();
    if (units.length === 0) {
      logger.fatal("No units found.");
    } else {
      logger.info("Units:");
      console.log("------------------------------");
      units.forEach((unit) => {
        logger.info(`ID: ${unit._id}`);
        logger.info(`Name: ${unit.name}`);
        logger.info(`Budget: ${unit.budget}`);
        console.log("------------------------------");
      });
    }
    let enter = await rl.question("Press enter to return to the menu...");
    while (enter !== "") {
      enter = await rl.question("Press enter to return to the menu...");
    }
    if (enter === "") {
      await startAdminApp();
    }
  } catch (error) {
    logger.fatal("Error: ", error);
    await startAdminApp();
  }
}
