import {
  createProductImageByIdDb,
  deleteProductImageByIdDb,
} from '../domains/image.js'
import { getVariantByIdDb } from '../domains/variant.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const createProductImageById = async (req, res) => {
  const productId = Number(req.params.id)

  const product = await getVariantByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const { url } = req.body

  if (!url) {
    throw new BadRequestError('Missing fields in request body')
  }

  const image = await createProductImageByIdDb(productId, url)

  return res.status(201).json({
    image,
  })
}

const deleteProductImageById = async (req, res) => {
  const productId = Number(req.params.id)

  const product = await getVariantByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const { imageId } = req.body

  if (!imageId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const image = await deleteProductImageByIdDb(productId, imageId)

  return res.status(201).json({
    image,
  })
}

export { createProductImageById, deleteProductImageById }
