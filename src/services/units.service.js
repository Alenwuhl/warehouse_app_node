import Unit from "../models/units.model.js";
import UserService from "./users.service.js";

export default class UnitService {
  async updateUnitBudget(id, newBudget) {
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
  async returnUnitBudget(unitId) {
    try {
      const unit = await Unit.findById(unitId);
      if (!unit) {
        throw new Error("Unit not found");
      }
      return unit.budget;
    } catch (error) {
      console.error("Error returning unit budget:", error);
      throw error;
    }
  }
  async createUnit(unit) {
    try {
      const newUnit = await Unit.create(unit);
      return newUnit;
    } catch (error) {
      console.error("Error creating unit:", error);
      throw error;
    }
  }

  async getUnits() {
    try {
      const units = await Unit.find();
      return units;
    } catch (error) {
      console.error("Error getting all units:", error);
      throw error;
    }
  }
  async getUnitId(unitName) {
    try {
      const unit = await Unit.findOne({ name: unitName });
      if (!unit) {
        throw new Error("Unit not found");
      }
      return unit._id;
    } catch (error) {
      console.error("Error getting unit ID:", error);
      throw error;
    }
  }

  async deleteUnit(id) {
    try {
      return await Unit.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error deleting unit:", error);
      throw error;
    }
  }
}
