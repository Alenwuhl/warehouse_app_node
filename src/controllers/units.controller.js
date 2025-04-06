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
export const returnUnitBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const budget = await unitService.returnUnitBudget(id);
        res.status(200).json({ budget });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}