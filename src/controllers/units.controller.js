import UnitService from "../services/units.service.js";


const unitService = new UnitService();

export const updateUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { budget } = req.body;
        const updatedUnit = await unitService.updateUnit(id, budget);
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