import { Router } from 'express'
import {
  createVariant,
  deleteVariantById,
  updateVariantById,
} from '../controllers/variant.js'
import { isAdmin, isTokenValid } from '../middleware/auth.js'

const route = Router()

route.post('/:productId', isTokenValid, isAdmin, createVariant)
route.delete('/:productId', isTokenValid, isAdmin, deleteVariantById)
route.put('/:productId', isTokenValid, isAdmin, updateVariantById)

export default route
