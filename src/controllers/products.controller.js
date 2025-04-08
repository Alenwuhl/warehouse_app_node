import ProductService from "../services/products.service.js";
import CartService from "../services/carts.service.js"

const productsService = new ProductService();
const cartService = new CartService();

export async function getProducts() {
  try {
    const products = await productsService.getProducts();
    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProductsNamesAndIds() {
  try {
    const products = await productsService.getAllProductsNamesAndIds();
    return products;
  } catch (error) {
    console.error(error);
  }
}
export async function getProductsbyIds(cart) {
  try {
    const pArrays = await productsService.getProductsbyIds(cart)
    return pArrays
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id) {
  try {
    debugger
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
export async function updateProduct(productId, updateAttribute, updateValue) {
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
  }
}

export async function findProductsByCategory(category) {
  try {
    const products = await productsService.findProductsByCategory(category);
    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function getDefectiveProducts() {
  try {
    const products = await productsService.getDefectiveProducts();
    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function findProductsByExpirationDate(expirationDate) {
  try {
    const date = new Date(
      expirationDate.year,
      expirationDate.month - 1,
      expirationDate.day
    );
    const products = await productsService.findProductsByExpirationDate(date);
    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function AddToTheCart(productId, quantity, unit) {
  try{
  const orderNnumber = Math.floor(Math.random() * 1000000)
  const activeCart = await cartService.activeCart(unit)
  const cartId = activeCart.cartId

  
  if (activeCart) {
    return  await cartService.AddProductToCart(productId, quantity, cartId, unit)
  } else {
    const newCart = {
      items: [],
      orderNumber: orderNnumber,
      totalPrice: 0,
      unitId: unit,
      status: "active"
    }
    await cartService.createCart(newCart)
    return await cartService.AddProductToCart(productId, quantity, cartId, unit)
  }}catch (error) {
    console.error(error)
  }

}

// export async function buyAProduct(productId, quantity, unit) {
//   try {
//     const cartItem = await productsService.verifyThePurchase(
//       productId,
//       quantity,
//       unit
//     );
//     if (cartItem) {
//       return (productToBuy = await productsService.buyAProduct(cartItem));
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function deleteProduct(id) {
  try {
    const deletedProduct = await productsService.deleteProduct(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return deletedProduct;
  } catch (error) {
    console.error(error);
  }
}
