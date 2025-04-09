import * as productsController from "../../controllers/products.controller.js";
import startAdminApp from "./adminApp.js";
import rl from "../../config/readline.js";
import e from "express";

export default async function updateProduct() {
  const products = await productsController.getProducts();
  console.log(`Please enter the product name to update: 
  ${products.map((p, i) => `${i + 1}. ${p.title}`).join("\n")}`);
  let chooseProduct = await rl.question("- ");
  while (chooseProduct < 1 || chooseProduct > products.length) {
    console.log("Invalid choice. Please enter a valid number");
    console.log(`Please enter the product name to update: 
      ${products.map((p, i) => `${i + 1}. ${p.title}`).join("\n")}`);
  }
  chooseProduct = products[chooseProduct - 1];

  if (chooseProduct) {
    console.log("This is the product: ");
    console.log("----------------------------------------");
    console.log(`Title: ${chooseProduct.title}`);
    console.log(`Description: ${chooseProduct.description}`);
    console.log(`Price: ${chooseProduct.price}`);
    console.log(`Category: ${chooseProduct.category}`);
    console.log(`Stock: ${chooseProduct.stock}`);
    console.log(`Expiration date: ${chooseProduct.expirationDate}`);
    console.log(`Status: ${chooseProduct.status}`);
    console.log("----------------------------------------");

    console.log("Please enter which think you want to update: ");
    console.log("1. title");
    console.log("2. description");
    console.log("3. price");
    console.log("4. category");
    console.log("5. stock");
    console.log("6. expiration date");
    console.log("7. status");

    let updateAttribute = await rl.question("- ");

    while (
      updateAttribute < 1 ||
      updateAttribute > 7 ||
      isNaN(updateAttribute)
    ) {
      console.log("Invalid choice. Please enter a valid number");
      updateAttribute = await rl.question("- ");
    }

    switch (updateAttribute) {
      case "1":
        updateAttribute = "title";
        break;
      case "2":
        updateAttribute = "description";
        break;
      case "3":
        updateAttribute = "price";
        break;
      case "4":
        updateAttribute = "category";
        break;
      case "5":
        updateAttribute = "stock";
        break;
      case "6":
        updateAttribute = "expirationDate";
        break;
      case "7":
        updateAttribute = "status";
        break;
      default:
    }
    if (updateAttribute === "expirationDate") {
      console.log("Please enter the new expiration year:");
      let expirationYear = await rl.question("- ");
      console.log("Please enter the new expiration month:");
      let expirationMonth = await rl.question("- ");
      console.log("Please enter the new expiration day:");
      let expirationDay = await rl.question("- ");
      if (
        isNaN(expirationYear) ||
        isNaN(expirationMonth) ||
        isNaN(expirationDay)
      ) {
        console.log("Invalid date. Please enter a valid date.");
        await updateProduct();
      }
      expirationYear = parseInt(expirationYear);
      expirationMonth = parseInt(expirationMonth);
      expirationDay = parseInt(expirationDay);
      const expirationDate = new Date(
        expirationYear,
        expirationMonth - 1,
        expirationDay
      );
      if (isNaN(expirationDate.getTime())) {
        console.log("Invalid date. Please enter a valid date.");
        await updateProduct();
      }      
      const updatedProduct = await productsController.updateProduct(
        chooseProduct,
        updateAttribute,
        expirationDate
      );
      if (updatedProduct) {
        console.log(`Product ${chooseProduct} has been updated successfully.`);
        await startAdminApp();
      } else {
        console.log(`Failed to update product ${chooseProduct}.`);
        await updateProduct();
      }
    } else if (updateAttribute === "category") {
      console.log(
        "Please enter the number of the product category, you can choose between:"
      );
      console.log("1. weapons");
      console.log("2. clothing");
      console.log("3. electronics");
      console.log("4. other");
      let productCategory = await rl.question("- ");
      while (
        productCategory !== "1" &&
        productCategory !== "2" &&
        productCategory !== "3" &&
        productCategory !== "4"
      ) {
        console.log("Please enter a valid category number (1-4):");
        console.log("1. weapons");
        console.log("2. clothing");
        console.log("3. electronics");
        console.log("4. other");
        productCategory = await rl.question("- ");
      }
      switch (productCategory) {
        case "1":
          productCategory = "weapons";
          break;
        case "2":
          productCategory = "clothing";
          break;
        case "3":
          productCategory = "electronics";
          break;
        case "4":
          productCategory = "other";
          break;
        default:
      }
      const updatedProduct = await productsController.updateProduct(
        chooseProduct,
        updateAttribute,
        productCategory
      );
      if (updatedProduct) {
        console.log(`Product ${chooseProduct} has been updated successfully.`);
      } else {
        console.log(`Failed to update product ${chooseProduct}.`);
        await startAdminApp();
      }
    } else if (updateAttribute === "status") {
      if (chooseProduct.status === "Defective product") {
        console.log("You cannot update the status of a defective product.");
        console.log("Try creating a new product instead.");
        await startAdminApp();
      } else {
        console.log('Do you want to change the status to "Defective product"?');
        console.log("1. Yes");
        console.log("2. No");
        let changeStatus = await rl.question("- ");
        while (changeStatus !== "1" && changeStatus !== "2") {
          console.log("Please enter a valid option (1-2):");
          console.log("1. Yes");
          console.log("2. No");
          changeStatus = await rl.question("- ");
        }
        switch (changeStatus) {
          case "1":
            changeStatus = "Defective product";
            break;
          case "2":
            console.log("Status not changed");
            await updateProduct();
            break;
          default:
        }
        const updatedProduct = await productsController.updateProduct(
          chooseProduct,
          updateAttribute,
          changeStatus
        );
        if (updatedProduct) {
          console.log(
            `Product ${chooseProduct.title} has been updated successfully.`
          );
          await startAdminApp();
        } else {
          console.log(`Failed to update product ${chooseProduct}.`);
          await updateProduct();
        }
      }
    } else {
      const newValue = await rl.question("Please enter the new value: ");
      const updatedProduct = await productsController.updateProduct(
        chooseProduct,
        updateAttribute,
        newValue
      );
      if (updatedProduct) {
        console.log(`The product has been updated successfully.`);
        console.log("The new product is: ");
        console.log("----------------------------------------");
        console.log(`Title: ${updatedProduct.title}`);
        console.log(`Description: ${updatedProduct.description}`);
        console.log(`Price: ${updatedProduct.price}`);
        console.log(`Category: ${updatedProduct.category}`);
        console.log(`Stock: ${updatedProduct.stock}`);
        console.log(`Expiration date: ${updatedProduct.expirationDate}`);
        console.log(`Status: ${updatedProduct.status}`);
        console.log("----------------------------------------");
        await startAdminApp();
      } else {
        console.log(`Failed to update product ${chooseProduct}.`);
        await updateProduct();
      }
    }
  }
}
