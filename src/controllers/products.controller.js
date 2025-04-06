import ProductService from '../services/products.service.js';

const productsService = new ProductService();

export async function getProducts (){
    try {
        const products = await productsService.getProducts();
        return products;
    } catch (error) {
        console.error(error);
    }
}

export async function getProductById (id){
    try {
        const product = await productsService.getProductById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
    catch (error) {
        console.error(error);
    }
}
export async function createProduct (title, description, price, stock, category, expirationDate, status) {
    try {
        const product = {
            title,
            description,
            price,
            stock,
            category,
            expirationDate,
            status
        };
        const newProduct = await productsService.createProduct(product);
        return newProduct;
    } catch (error) {
        console.error(error);
    }
}
// export async function updateProduct (){
//     try {
//         const product = req.body;
//         const updatedProduct = await productsService.updateProduct(id, product);
//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// 
export async function deleteProduct (name) {
    try {
        const product = await productsService.getProductById(name);
        const id = product.id;
        const deletedProduct = await productsService.deleteProduct(id);
        if (!deletedProduct) {
            throw new Error('Product not found');
        }
        return deletedProduct;
    } catch (error) {
        console.error(error);
    }
}