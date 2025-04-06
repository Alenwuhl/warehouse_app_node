import startAdminApp from "./adminApp.js";

export async function displayMainMenu() {
    console.log("Welcome to the main menu!");
    console.log("1. Register as an admin");
    console.log("2. Register as a unit member");
    console.log("3. Login with your account");
  
    const answer = await rl.question("Please enter your answer: ");
    
    switch (answer) {
      case "1":
        const adminName = await rl.question("Please enter your name: ");
        
        if (!adminName) {
          console.log("Name is required.");
          return;
        }
        const adminPassword = await rl.question("Please enter your password: ");
        if (!adminPassword) {
          console.log("Password is required.");
          return;
        }
        
        userController.registerAdmin(adminName, adminPassword);
        
        
        console.log(`You have registered as an admin with the name: ${adminName}`);
        break;
      case "2":
        const name = await rl.question("Please enter your name: ");
        const password = await rl.question("Please enter your password: ");
        const availableUnits = await unitsController.getAllUnitsNames();
        console.log(`Available units: ${availableUnits}`);
        const unit = await rl.question(`Please enter your unit, you can choose between: ${availableUnits.join(', ')} `);
        userController.registerUser(name, password, unit);
        console.log(`You have registered as a unit member with the name: ${name}`);
        console.log(`You have registered in the unit: ${unit}`);
        const unitBudget = await unitsController.returnUnitBudget(unit);
        console.log(`Your budget is: ${unitBudget}`);
        break;
      case "3":
        const loginName = await rl.question("Please enter your name: ");
        const loginPassword = await rl.question("Please enter your password: ");
        const loginResponse = await userController.loginUser(loginName, loginPassword);
        if (!loginResponse) {
          console.log("Login failed. Please check your credentials.");
        } else {
          console.log(`Welcome back, ${loginResponse.user.name}!`);
          if (loginResponse.user.role === "admin") {
            console.log("You are logged in as an admin.");
            console.log("You can now manage products and units.");
            startAdminApp()
          } else {
            console.log("You are logged in as a unit member.");
            console.log(`Your unit budget is: ${unitsController.returnUnitBudget(loginResponse.user.unit)}`);
            console.log("You can now buy products from the store.");
            startShopping(loginResponse.user.unit);
          }
        }
        break;
      default:
        console.log("Invalid answer. Please try again.");
        displayMainMenu();
    }
  }