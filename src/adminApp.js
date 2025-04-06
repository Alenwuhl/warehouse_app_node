export async function startAdminApp() {
    console.log("Welcome to the admin app!");
    console.log("1. View all products");
    console.log("2. Create a new product");
    console.log("3. Update a product");
    console.log("4. Delete a product");
    console.log("5. View all units");
    console.log("6. Create a new unit");
    console.log("7. Update budget for an unit");
    console.log("8. Delete an unit");
    console.log("9. View all orders");
    console.log("10. Find orders by order number");
    console.log("11. Find orders by status");
    console.log("12. Find orders by product");
    console.log("13. Find products by category");
    console.log("14. Find products by defective product");
    console.log("15. Find products by expiration date");
    console.log("16. Exit");
  
    const answer = await rl.question("Please enter your answer: ");
  
    switch (answer) {
      case "1":
        availableProducts = await productsController.getProducts();
        console.log("Products: ", availableProducts);
        // console.log("Products: ", await productController.getAllProducts());
        break;
      case "2":
        const productName = await rl.question("Please enter the product name: ");
        // const productCategory = await rl.question("Please enter the product category, you can choose between: electronics, clothing, food: ");
        const productPrice = await rl.question("Please enter the product price: ");
        const productStock = await rl.question("Please enter the product stock: ");
        await productController.createProduct(productName, productCategory, productPrice, productStock);
        console.log(`Product ${productName} created successfully.`);
        break;
      // case "3":
      //   const newProductName = await rl.question("Please enter the new product name: ");
  
  }}