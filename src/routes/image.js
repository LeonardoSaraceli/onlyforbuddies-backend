import { Router } from 'express'
import {
  createProductImageById,
  deleteProductImageById,
} from '../controllers/image.js'

const route = Router()

route.post('/:id', createProductImageById)
route.delete('/:id', deleteProductImageById)

export default route
