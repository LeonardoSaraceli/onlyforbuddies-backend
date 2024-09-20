import { prisma } from '../utils/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUserDb = async (email, password) => {
  return await prisma.user.create({
    data: {
      email: email,
      password: await bcrypt.hash(password, 10),
    },
  })
}

const getUserByEmailDb = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}

const comparePasswordDb = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword)
}

const createTokenDb = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY)
}

const getUserByIdDb = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}

export {
  createUserDb,
  getUserByEmailDb,
  comparePasswordDb,
  createTokenDb,
  getUserByIdDb,
}
