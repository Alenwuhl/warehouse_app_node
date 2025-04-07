import UserModel from "../models/users.model.js";
import Unit from "../models/units.model.js";
import { createHash, comparePassword } from "../utils/bcrypt.js";

export default class UsersService {
  async registerUser(username, password, unit) {
    try {
      let verifyUsername = [];
      const otherUser = await UserModel.findOne({ username });
      if (otherUser) {
        verifyUsername.push(otherUser.username);
      }
      if (verifyUsername.length > 0) {
        throw new Error("Username already exists, try another one");
      }
      const hashedPassword = createHash(password);
      const newUser = new UserModel({ username, password: hashedPassword, unit });   
      return await newUser.save();
      
    } catch (error) {
      throw new Error("Error registering user", error);
    }
  }
  async registerAdmin({username, password}) {
    try {
      let verifyUsername = [];
      const otherUser = await UserModel.findOne({ username });
      if (otherUser) {
        verifyUsername.push(otherUser.username);
      }
      if (verifyUsername.length > 0) {
        throw new Error("Username already exists, try another one");
      }
      const hashedPassword = createHash(password);
      const unit = await Unit.findOne({ name: "admin" });
      const unitId = unit._id;
      const newAdmin = new UserModel({ username, password: hashedPassword, role: "admin", unit: unitId });
      if(!username || !password || !unit) {
        throw new Error("username, password and unit are required");
      }
      await newAdmin.save();
      return newAdmin;
    } catch (error) {
      console.error("Error registering admin:", error);
      throw new Error("Error registering admin");
    }
  }

  async loginUser(username, password) {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.password) {
        throw new Error("Password is required");
      } 
      const validation = await comparePassword(password, user.password);
      if (!validation) {
        throw new Error("Invalid password");
      }
      return { user };
    } catch (error) {
      console.error("Error logging in user:", error);
      throw new Error("Error logging in user");
    }
  }
}
