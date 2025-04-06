import Product from "../models/products.model.js";

export default class ProductService {
  getProducts = async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  };

  getProductById = async (id) => {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.error("Error getting product by Id:", error);
      throw error;
    }
  };

  getProductsNames = async () => {
    try {
      const products = await Product.find();
      const productNames = products.map((product) => ({
        Title: product.title,
      }));
      return productNames;
    } catch (error) {
      console.error("Error getting products names:", error);
      throw error;
    }
  };

  createProduct = async (productData) => {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  updateProduct = async (id, productData) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
      });
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
  deleteProduct = async (id) => {
    try {
      await Product.findByIdAndDelete(id);
      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };
  modifyQuantityOnStock = async (id, newQuantity) => {
    try {
      const product = await Product.findById(id);
      const newStock = product.stock + newQuantity;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $inc: { stock: newStock } },
        { new: true }
      );
      console.log(
        "The product stock has been updated, the new stock is: ",
        updatedProduct.stock
      );
      return updatedProduct;
    } catch (error) {
      console.error("Error modifying quantity to product:", error);
      throw error;
    }
  };
  verifyProduct = async (id, quantity) => {
    const product = Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.stock < quantity) {
      console.log(
        "You will not be able to buy this product, the stock is: ",
        product.stock
      );
      console.log("Try to buy a lower quantity");
      throw new Error("Not enough stock");
    }
    if (product.expirationDate < new Date()) {
      console.log("You will not be able to buy this product!");
      throw new Error("The product has expired");
    }
    if (product.status === "Defective product") {
      console.log("You will not be able to buy this product!");
      throw new Error("Product is defective");
    }
    if (product.status === "Sold product") {
      console.log("You will not be able to buy this product!");
      throw new Error("Product is sold");
    }
    return product;
  };
}
