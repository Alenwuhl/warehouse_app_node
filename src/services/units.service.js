import Unit from "../models/units.model.js";
import UserService from "./users.service.js";

export default class UnitService {
  async updateUnit(id, newBudget) {
    try {
      const unit = await Unit.findByIdAndUpdate(
        id,
        { budget: newBudget },
        { new: true, runValidators: true }
      );
      if (!unit) {
        throw new Error("Unit not found");
      }
      return unit;
    } catch (error) {
      console.error("Error updating unit:", error);
      throw error;
    }
  }
  async returnUnitBudgetbyUserId(id) {
    try {
      const user = await UserService.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        const unit = await Unit.find(user.unit);
      if (!unit) {
        throw new Error("Unit of this user not found");
      }
      return unit.budget;
    } catch (error) {
      console.error("Error returning unit budget:", error);
      throw error;
    }
  }
}
