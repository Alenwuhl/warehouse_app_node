import UnitService from "../services/units.service.js";

const unitService = new UnitService();

export async function updateUnitBudget(unitId, budget) {
  try {
    const updatedUnit = await unitService.updateUnitBudget(unitId, budget);
    return updatedUnit
  } catch (error) {
    console.error(error)
  }
}
export async function createUnit(unitName, unitBudget) {
  try {
    const unit = { name: unitName, budget: unitBudget, unitCode: unitName };
    const newUnit = await unitService.createUnit(unit);
    return newUnit;
  } catch (error) {
    console.error(error);
  }
}
export async function returnUnitBudget(unitName) {
  try {
    const unitId = await unitService.getUnitId(unitName);
    const unit = await unitService.returnUnitBudget(unitId);
    return unit;
  } catch (error) {
    console.error(error);
  }
}
export async function getUnits() {
  try {
    const units = await unitService.getUnits();
    return units;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteUnit(id) {
  try {
    const unit = await unitService.deleteUnit(id);
    return unit;
  } catch (error) {
    console.error(error);
  }
}

