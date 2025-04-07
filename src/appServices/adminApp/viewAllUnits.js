import * as unitsController from "../../controllers/units.controller.js";
import startAdminApp from "./adminApp.js";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

export const rl = createInterface({ input, output });


export default async function viewAllUnits(){
    try{
        const units = await unitsController.getAllUnitsNames();
        console.log("Units: ", units);

    } catch (error){
        console.log("Error: ", error);
        await startAdminApp();
    }
}