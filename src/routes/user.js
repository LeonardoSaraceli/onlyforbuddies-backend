import { Router } from 'express'
import { createToken, createUser } from '../controllers/user.js'

const route = Router()

route.post('/register', createUser)
route.post('/login', createToken)

export default route
