import { Router } from 'express'
import {
  addProductToCart,
  deleteProductFromCart,
  getCartById,
  removeProductFromCart,
} from '../controllers/cart.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/:id', isTokenValid, getCartById)
route.put('/:id/add-product', isTokenValid, addProductToCart)
route.put('/:id/decrement-product', isTokenValid, removeProductFromCart)
route.put('/:id/remove-product', isTokenValid, deleteProductFromCart)

export default route
