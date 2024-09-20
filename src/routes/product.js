import { Router } from 'express'
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from '../controllers/product.js'
import { isAdmin, isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', getAllProducts)
route.post('/', isTokenValid, isAdmin, createProduct)
route.get('/:id', getProductById)
route.put('/:id', isTokenValid, isAdmin, updateProductById)
route.delete('/:id', isTokenValid, isAdmin, deleteProductById)

export default route
