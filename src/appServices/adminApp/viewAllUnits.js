import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";

export default async function viewAllUnits() {
  try {
    const units = await unitsController.getUnits();
    if (units.length === 0) {
      console.log("No units found.");
    } else {
      console.log("Units:");
      console.log("------------------------------");
      units.forEach((unit) => {
        console.log(`ID: ${unit._id}`);
        console.log(`Name: ${unit.name}`);
        console.log(`Budget: ${unit.budget}`);
        console.log("------------------------------");
      });
    }
    const enter = await rl.question("Press enter to return to the menu...");
    if (enter === "") {
      await startAdminApp();
    }
  } catch (error) {
    console.log("Error: ", error);
    await startAdminApp();
  }
}
