import { prisma } from '../utils/prisma.js'

const createVariantDb = async (productId, sku, color, hex, price) => {
  return await prisma.variant.create({
    data: {
      product_id: productId,
      sku: sku,
      color: color,
      hex: hex,
      price: price,
    },
  })
}

const getVariantByIdDb = async (variantId) => {
  return await prisma.variant.findUnique({
    where: {
      id: variantId,
    },
    include: {
      sizes: {
        include: {
          size: true,
        },
      },
      images: true,
    },
  })
}

const deleteVariantByIdDb = async (productId, variantId) => {
  return await prisma.variant.delete({
    where: {
      id: variantId,
      product_id: productId,
    },
  })
}

const updateVariantByIdDb = async (
  productId,
  variantId,
  sku,
  color,
  hex,
  price
) => {
  return await prisma.variant.update({
    where: {
      id: variantId,
      product_id: productId,
    },
    data: {
      sku: sku,
      color: color,
      hex: hex,
      price: price,
    },
  })
}

export {
  createVariantDb,
  getVariantByIdDb,
  deleteVariantByIdDb,
  updateVariantByIdDb,
}
