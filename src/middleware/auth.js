import jwt from 'jsonwebtoken'
import {
  InsufficientPermissionError,
  InvalidTokenError,
} from '../errors/ApiError.js'
import { getUserByIdDb } from '../domains/user.js'

const isTokenValid = (req, res, next) => {
  try {
    const headers = req.headers['authorization']

    const token = headers.split(' ')[1]

    const payload = jwt.verify(token, process.env.SECRET_KEY)

    req.user = payload

    next()
  } catch (error) {
    throw new InvalidTokenError('Unauthorized token')
  }
}

const isAdmin = async (req, res, next) => {
  const { id } = req.user

  const user = await getUserByIdDb(id)

  if (user.role !== 'ADMIN') {
    throw new InsufficientPermissionError('Requires admin role')
  }

  next()
}

export { isTokenValid, isAdmin }
