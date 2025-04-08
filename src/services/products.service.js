import Product from "../models/products.model.js";
import Unit from "../models/units.model.js"

export default class ProductService {
  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }

  async getProductsbyIds(cart) {
    try {
      const itemIds = cart.items.map(i => i.productId);
      const products = await Product.find({_id: { $in: itemIds}})
      return products
    } catch (error) {
      
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.error("Error getting product by Id:", error);
      throw error;
    }
  }

  async findProductsByCategory(category) {
    try {
      const products = await Product.find({ category: category });
      return products;
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }

  async getDefectiveProducts() {
    try {
      const products = await Product.find({ status: "Defective product" });
      return products;
    } catch (error) {
      console.error("Error getting defective products:", error);
      throw error;
    }
  }

  async findProductsByExpirationDate(date) {
    try {
      const expiredProducts = [];
      const products = await Product.find();
      products.forEach((product) => {
        const productExpirationDate = product.expirationDate;
        if (productExpirationDate <= date) {
          expiredProducts.push(product);
        }
      });
      return expiredProducts;
    } catch (error) {
      console.error("Error getting products by expiration date:", error);
      throw error;
    }
  }

  async getAllProductsNamesAndIds() {
    try {
      const products = await Product.find();
      const productNames = products.map((product) => ({
        title: product.title,
        id: product._id,
      }));
      return productNames;
    } catch (error) {
      console.error("Error getting products names:", error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      if (
        !productData.title ||
        !productData.description ||
        !productData.price ||
        !productData.stock ||
        !productData.category
      ) {
        throw new Error("All fields are required");
      }
      if (productData.stock < 0) {
        throw new Error("Stock cannot be negative");
      }
      if (productData.expirationDate < new Date()) {
        throw new Error("Expiration date cannot be in the past");
      }
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  updateProduct = async (id, updateAttribute, newValue) => {
    try {
      const productToUpdate = await Product.findById(id);
      if (!productToUpdate) {
        throw new Error("Product not found");
      }
      if (
        (updateAttribute === "title" && newValue === "") ||
        (updateAttribute === "description" && newValue === "")
      ) {
        throw new Error("Title or description cannot be empty");
      }
      if (updateAttribute === "stock" && newValue < 0) {
        throw new Error("Stock cannot be negative");
      }
      if (updateAttribute === "expirationDate" && newValue < new Date()) {
        throw new Error("Expiration date cannot be in the past");
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          [updateAttribute]: newValue,
        },
        { new: true, runValidators: true }
      );
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
  async deleteProduct(id) {
    try {
      await Product.findByIdAndDelete(id);
      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
  
  async verifyThePurchase(id, quantity, unitId) {
    const product = await Product.findById(id);
    const productId = product.id
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
    
    return productId, quantity, unitId;
  }
}
