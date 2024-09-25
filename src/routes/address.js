import { Router } from 'express'
import { isTokenValid } from '../middleware/auth.js'
import {
  createUserAddressById,
  deleteUserAddressById,
} from '../controllers/address.js'

const route = Router()

route.post('/:id', isTokenValid, createUserAddressById)
route.delete('/:id', isTokenValid, deleteUserAddressById)

export default route
