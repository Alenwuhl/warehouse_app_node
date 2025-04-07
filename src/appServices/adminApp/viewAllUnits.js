import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js"


export default async function viewAllUnits(){
    try{
        const units = await unitsController.getAllUnitsNames();
        console.log("Units: ", units);
    const enter = await rl.question(
      "Press enter to return to the menu..."
    );
    if (enter === "") {
      await startAdminApp();
    }
    } catch (error){
        console.log("Error: ", error);
        await startAdminApp();
    }
}