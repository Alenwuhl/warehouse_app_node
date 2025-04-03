import Product from "../models/products.models.js";

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
}

