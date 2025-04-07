import ProductService from "../services/products.service.js";

const productsService = new ProductService();

export async function getProducts() {
  try {
    const products = await productsService.getProducts();
    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsNames() {
  try {
    const products = await productsService.getProductsNames();
    return products;
  } catch (error) {
    console.error(error);
  }
}
export async function getProductByName(name) {
  try {
    const product = await productsService.getProductByName(name);
    return product;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id) {
  try {
    const product = await productsService.getProductById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.error(error);
  }
}
export async function createProduct(
  title,
  description,
  price,
  stock,
  category,
  expirationYear,
  expirationMonth,
  expirationDay
) {
  try {
    const status = "Working product";
    const expirationDate = new Date(
      expirationYear,
      expirationMonth - 1,
      expirationDay
    );
    const product = {
      title: title,
      description: description,
      price: price,
      stock: stock,
      category: category,
      expirationDate: expirationDate,
      status: status,
    };
    const newProduct = await productsService.createProduct(product);
    return newProduct;
  } catch (error) {
    console.error(error);
  }
}
export async function updateProduct (productId, updateAttribute, updateValue) {
    try {
        const product = await productsService.getProductById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        const updatedProduct = await productsService.updateProduct(
            productId,
            updateAttribute,
            updateValue
        );
        return updatedProduct;
    } catch (error) {
        console.error(error);
    }}

export async function deleteProduct(name) {
  try {
    const product = await productsService.getProductById(name);
    const id = product.id;
    const deletedProduct = await productsService.deleteProduct(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return deletedProduct;
  } catch (error) {
    console.error(error);
  }
}
