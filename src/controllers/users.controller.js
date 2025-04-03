import usersService from "../services/users.service.js";

const userService = new usersService();

export const register = async (req, res) => {
  try {
    const { name, password, role } = req.body;
    const user = await userService.registerUser(name, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await userService.loginUser(name, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
