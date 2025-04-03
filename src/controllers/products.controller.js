import ProductService from '../services/products.service.js';

const productsService = new ProductService();

export const getProducts = async (req, res) => {
    try {
        const products = await productsService.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productsService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createProduct = async (product) => {
    try {
        // console.log("-----------", req.body);
        // const product = req.body;
        // console.log("-----------", product);

        const newProduct = await productsService.createProduct(product);
        return
    } catch (error) {
        return
    }
}
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = req.body;
        const updatedProduct = await productsService.updateProduct(id, product);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await productsService.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}