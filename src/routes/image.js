import { Router } from 'express'
import {
  createProductImageById,
  deleteProductImageById,
} from '../controllers/image.js'
import { isAdmin, isTokenValid } from '../middleware/auth.js'

const route = Router()

route.post('/:id', isTokenValid, isAdmin, createProductImageById)
route.delete('/:id', isTokenValid, isAdmin, deleteProductImageById)

export default route
