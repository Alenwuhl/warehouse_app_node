import UsersService from "../services/users.service.js";

const userService = new UsersService();

export async function registerUser(username, password, unit){
  try {
    const user = await userService.registerUser(username, password, unit);
    return user;
  } catch (error) {
    console.error(error);
  }
};
export async function registerAdmin (adminName, adminPassword) {
  try {
    const user = await userService.registerAdmin({ username: adminName, password: adminPassword });
    return user;
  } catch (error) {
    console.error(error);
  }
}
export async function loginUser(username, password) {
  try {
    const user = await userService.loginUser(username, password);
    return user;
  } catch (error) {
    console.error(error);
  }
};
