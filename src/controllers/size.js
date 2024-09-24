import {
  createProductSizeByIdDb,
  deleteProductSizeByIdDb,
} from '../domains/size.js'
import { getVariantByIdDb } from '../domains/variant.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const createProductSizeById = async (req, res) => {
  const productId = Number(req.params.id)

  const product = await getVariantByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const { productSize } = req.body

  if (!productSize) {
    throw new BadRequestError('Missing fields in request body')
  }

  if (typeof productSize !== 'string') {
    throw new BadRequestError('Size must be a string')
  }

  const size = await createProductSizeByIdDb(productId, productSize)

  return res.status(201).json({
    size,
  })
}

const deleteProductSizeById = async (req, res) => {
  const productId = Number(req.params.id)

  const product = await getVariantByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const { sizeId } = req.body

  if (!sizeId) {
    throw new BadRequestError('Missing fields in request body')
  }

  if (!product.sizes.some((s) => s.id === sizeId)) {
    throw new NotFoundError('Size not found')
  }

  const size = await deleteProductSizeByIdDb(productId, sizeId)

  return res.json({
    size,
  })
}

export { createProductSizeById, deleteProductSizeById }
