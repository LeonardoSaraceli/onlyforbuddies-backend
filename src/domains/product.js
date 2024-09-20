import { prisma } from '../utils/prisma.js'

const getAllProductsDb = async () => {
  return await prisma.product.findMany({
    include: {
      variants: true,
      categories: true,
    },
  })
}

const createProductDb = async (name, description) => {
  return await prisma.product.create({
    data: {
      name: name,
      description: description,
    },
  })
}

const getProductByIdDb = async (productId) => {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      variants: true,
      categories: true,
    },
  })
}

const updateProductByIdDb = async (productId, name, description) => {
  return await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: name,
      description: description,
    },
  })
}

const deleteProductByIdDb = async (productId) => {
  return await prisma.product.delete({
    where: {
      id: productId,
    },
  })
}

export {
  getAllProductsDb,
  createProductDb,
  getProductByIdDb,
  updateProductByIdDb,
  deleteProductByIdDb,
}
