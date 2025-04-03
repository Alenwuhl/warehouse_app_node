import UserModel from "../models/users.model.js";
import { generateToken } from "../utils/jwt.js";
import { createHash, comparePassword } from "../utils/bcrypt.js";

export default class UsersService {
  async registerUser(name, password, role) {
    try {
      const hashedPassword = await createHash(password);
      const newUser = new UserModel({ name, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error("Error registering user");
    }
  }
  async loginUser(name, password, role) {
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
