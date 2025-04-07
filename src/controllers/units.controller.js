import UnitService from "../services/units.service.js";


const unitService = new UnitService();

export async function updateUnitBudget (unitId, budget) {
    try {
        const updatedUnit = await unitService.updateUnitBudget(unitId, budget);
        res.status(200).json(updatedUnit);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}
export async function createUnit (unitName, unitBudget) {
    try {
        const unit = { name: unitName, budget: unitBudget, unitCode: unitName };
        const newUnit = await unitService.createUnit(unit);
        return newUnit;
    } catch (error) {
        console.error(error);
    }
}
export async function returnUnitBudget (unitName) {
    try {
        const unitId = await unitService.getUnitId(unitName);
        const unit = await unitService.returnUnitBudget(unitId);
        return unit;
    } catch (error) {
        console.error(error);
    }
}
export async function getAllUnitsNames() {
    try {
        const units = await unitService.getAllUnitsNames();
        return units;
    }
    catch (error) {
        console.error(error);
    }
}