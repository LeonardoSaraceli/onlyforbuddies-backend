import { prisma } from '../utils/prisma.js'

const createProductSizeByIdDb = async (productId, productSize, stock) => {
  const size = await prisma.size.create({
    data: {
      size: productSize,
    },
  })

  return await prisma.productSize.create({
    data: {
      variant_id: productId,
      size_id: size.id,
      stock: stock,
    },
  })
}

const deleteProductSizeByIdDb = async (productId, sizeId) => {
  const existingSize = await prisma.productSize.findFirst({
    where: {
      variant_id: productId,
      size_id: sizeId,
    },
  })

  return await prisma.productSize.delete({
    where: {
      id: existingSize.id,
    },
  })
}

export { createProductSizeByIdDb, deleteProductSizeByIdDb }
