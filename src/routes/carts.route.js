import Router from 'express';
import { getAllCarts } from '../controllers/carts.controller.js';

const router = Router();

router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.get('/status/:status', getCartByStatus);
router.get('/:id/products', getProductsInCart);
// router.post('/:id/products/:productId', addProductToCart);
// router.delete('/:id/products/:productId', removeProductFromCart);

 
export default router;