import UsersService from "../services/users.service.js";

const userService = new UsersService();

export const registerUser = async (req, res) => {
  try {
    const { name, password, unit } = req.body;
    const user = await userService.registerUser(name, password, unit);
    return
  } catch (error) {
    console.error(error);
  }
};
export async function registerAdmin (adminName, adminPassword) {
  try {
    const user = await userService.registerAdmin({ name: adminName, password: adminPassword });
    return
  } catch (error) {
    console.error(error);
  }
}
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await userService.loginUser(name, password);
    return
  } catch (error) {
    console.error(error);
  }
};
