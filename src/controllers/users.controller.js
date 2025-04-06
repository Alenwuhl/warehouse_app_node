import UsersService from "../services/users.service.js";

const userService = new UsersService();

export async function registerUser(name, password, unit){
  try {
    const user = await userService.registerUser(name, password, unit);
    return user;
  } catch (error) {
    console.error(error);
  }
};
export async function registerAdmin (adminName, adminPassword) {
  try {
    const user = await userService.registerAdmin({ name: adminName, password: adminPassword });
    return user;
  } catch (error) {
    console.error(error);
  }
}
export async function loginUser(name, password) {
  try {
    const user = await userService.loginUser(name, password);
    return user;
  } catch (error) {
    console.error(error);
  }
};
