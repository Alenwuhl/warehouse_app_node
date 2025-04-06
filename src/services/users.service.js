import UserModel from "../models/users.model.js";
import { generateToken } from "../utils/jwt.js";
import { createHash, comparePassword } from "../utils/bcrypt.js";

export default class UsersService {
  async registerUser(name, password, unit) {
    try {
      const hashedPassword = createHash(password);
      const newUser = new UserModel({ name, password: hashedPassword, unit });   
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error("Error registering user");
    }
  }
  async registerAdmin(name, password) {
    try {
      const hashedPassword = createHash(password);
      const newAdmin = new UserModel({ name, password: hashedPassword, role: "admin" });
      const unit = await UintModel.findOne({ name: "admin" });
      if (!unit) {
        const newUnit = unitController.createUnit({ name: "admin", budget: 0 });
        return newUnit;
      }
      if(!name || !password) {
        throw new Error("Name and password are required");
      }
      await newAdmin.save();
      return newAdmin;
    } catch (error) {
      throw new Error("Error registering admin");
    }
  }
  async loginUser(name, password) {
    try {
      const user = await UserModel.findOne({ name });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const token = generateToken(user.id);
      return { user, token };
    } catch (error) {
      throw new Error("Error logging in user");
    }
  }
}
