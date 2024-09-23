import { Router } from 'express'
import {
  addProductToCart,
  deleteProductFromCart,
  getCartById,
  removeProductFromCart,
} from '../controllers/cart.js'

const route = Router()

route.get('/:id', getCartById)
route.put('/:id/add-product', addProductToCart)
route.put('/:id/decrement-product', removeProductFromCart)
route.put('/:id/remove-product', deleteProductFromCart)

export default route
