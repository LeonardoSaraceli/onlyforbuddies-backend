import { Router } from 'express'
import {
  createUserOrderById,
  deleteUserOrderById,
  getAllOrders,
} from '../controllers/order.js'
import { isAdmin, isTokenValid } from '../middleware/auth.js'

const route = Router()

route.get('/', isTokenValid, isAdmin, getAllOrders)
route.post('/', isTokenValid, createUserOrderById)
route.delete('/', isTokenValid, isAdmin, deleteUserOrderById)

export default route
