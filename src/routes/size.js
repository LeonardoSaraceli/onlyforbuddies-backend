import { Router } from 'express'
import {
  createProductSizeById,
  deleteProductSizeById,
} from '../controllers/size.js'
import { isAdmin, isTokenValid } from '../middleware/auth.js'

const route = Router()

route.post('/:id', isTokenValid, isAdmin, createProductSizeById)
route.delete('/:id', isTokenValid, isAdmin, deleteProductSizeById)

export default route
