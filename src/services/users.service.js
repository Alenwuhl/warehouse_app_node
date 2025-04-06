import UserModel from "../models/users.model.js";
import Unit from "../models/units.model.js";
import { generateToken } from "../utils/jwt.js";
import { createHash, comparePassword } from "../utils/bcrypt.js";

export default class UsersService {
  async registerUser(name, password, unit) {
    try {
      console.log("name:", name);
      console.log("password:", password);
      console.log("unit:", unit);
      // const hashedPassword = createHash(password);
      const newUser = new UserModel({ name, password, unit });   
      console.log("newUser:", newUser);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Error registering user", error);
    }
  }
  async registerAdmin({name, password}) {
    try {
      console.log("name:", name);
      console.log("password:", password);
      
      // const hashedPassword = createHash(password);
      const unit = await Unit.findOne({ name: "admin" });
      console.log("unit:", unit);
      const unitId = unit._id;
      const newAdmin = new UserModel({ name, password, role: "admin", unit: unitId });
      console.log("newAdmin:", newAdmin);
      if(!name || !password || !unit) {
        throw new Error("Name, password and unit are required");
      }
      await newAdmin.save();
      return newAdmin;
    } catch (error) {
      console.error("Error registering admin:", error);
      throw new Error("Error registering admin");
    }
  }

  //Tengo que arreglar esto
  async loginUser(name, password) {
    try {
      const user = await UserModel.findOne({ name });
      if (!user) {
        throw new Error("User not found");
      }
      console.log("user:", user);
      if (!user.password) {
        throw new Error("Password is required");
      } 
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      
      
      // const isPasswordValid = await comparePassword(password, user.password);
      // if (!isPasswordValid) {
      //   throw new Error("Invalid password");
      // }
      // const token = generateToken(user.id);
      return { user };
    } catch (error) {
      console.error("Error logging in user:", error);
      throw new Error("Error logging in user");
    }
  }
}
