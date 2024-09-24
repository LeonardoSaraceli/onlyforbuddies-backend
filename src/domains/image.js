import { prisma } from '../utils/prisma.js'

const createProductImageByIdDb = async (productId, url) => {
  return await prisma.image.create({
    data: {
      url: url,
      variant_id: productId,
    },
  })
}

const deleteProductImageByIdDb = async (productId, imageId) => {
  return await prisma.image.delete({
    where: {
      id: imageId,
      variant_id: productId,
    },
  })
}

export { createProductImageByIdDb, deleteProductImageByIdDb }
