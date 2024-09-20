import {
  comparePasswordDb,
  createTokenDb,
  createUserDb,
  getUserByEmailDb,
} from '../domains/user.js'
import {
  BadRequestError,
  ExistingUniqueField,
  NotFoundError,
} from '../errors/ApiError.js'

const createUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const existingUser = await getUserByEmailDb(email)

  if (existingUser) {
    throw new ExistingUniqueField('Email already registered')
  }

  const user = await createUserDb(email, String(password))

  delete user.password

  return res.status(201).json({
    user,
  })
}

const createToken = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByEmailDb(email)

  if (!user) {
    throw new NotFoundError('Incorrect email or password')
  }

  const passwordMatch = await comparePasswordDb(String(password), user.password)

  if (!passwordMatch) {
    throw new NotFoundError('Incorrect email or password')
  }

  const token = createTokenDb(user.id)

  return res.status(201).json({
    token,
  })
}

export { createUser, createToken }
