import { Router } from 'express'
import { createToken, createUser, getUserById } from '../controllers/user.js'
import { isTokenValid } from '../middleware/auth.js'

const route = Router()

route.post('/register', createUser)
route.post('/login', createToken)
route.get('/:id', isTokenValid, getUserById)

export default route
