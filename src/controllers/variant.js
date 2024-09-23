import { getProductByIdDb } from '../domains/product.js'
import {
  createVariantDb,
  deleteVariantByIdDb,
  getVariantByIdDb,
  updateVariantByIdDb,
} from '../domains/variant.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const createVariant = async (req, res) => {
  const productId = Number(req.params.productId)

  const product = await getProductByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const { sku, color, hex, price } = req.body

  if (!sku || !color || !hex || !price) {
    throw new BadRequestError('Missing fields in request body')
  }

  if (hex.length !== 7) {
    throw new BadRequestError('Hex must have 7 digits')
  }

  const variant = await createVariantDb(productId, sku, color, hex, price)

  return res.status(201).json({
    variant,
  })
}

const deleteVariantById = async (req, res) => {
  const productId = Number(req.params.productId)

  const product = await getProductByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const { variantId } = req.body

  if (!variantId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const existingVariant = await getVariantByIdDb(productId, variantId)

  if (!existingVariant) {
    throw new NotFoundError('Variant not found')
  }

  const variant = await deleteVariantByIdDb(variantId)

  return res.json({
    variant,
  })
}

const updateVariantById = async (req, res) => {
  const productId = Number(req.params.productId)

  const product = await getProductByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const { variantId, sku, color, hex, price } = req.body

  if (!variantId || !sku || !color || !hex || !price) {
    throw new BadRequestError('Missing fields in request body')
  }

  if (hex.length !== 7) {
    throw new BadRequestError('Hex must have 7 digits')
  }

  const existingVariant = await getVariantByIdDb(variantId)

  if (!existingVariant) {
    throw new NotFoundError('Variant not found')
  }

  const variant = await updateVariantByIdDb(
    productId,
    variantId,
    sku,
    color,
    hex,
    price
  )

  return res.json({
    variant,
  })
}

export { createVariant, deleteVariantById, updateVariantById }
