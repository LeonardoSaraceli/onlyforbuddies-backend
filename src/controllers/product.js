import {
  createProductDb,
  deleteProductByIdDb,
  getAllProductsDb,
  getProductByIdDb,
  updateProductByIdDb,
} from '../domains/product.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getAllProducts = async (req, res) => {
  const products = await getAllProductsDb()

  return res.json({
    products,
  })
}

const createProduct = async (req, res) => {
  const { name, description } = req.body

  if (!name || !description) {
    throw new BadRequestError('Missing fields in request body')
  }

  const product = await createProductDb(name, description)

  return res.status(201).json({
    product,
  })
}

const getProductById = async (req, res) => {
  const id = Number(req.params.id)

  const product = await getProductByIdDb(id)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  return res.json({
    product,
  })
}

const updateProductById = async (req, res) => {
  const id = Number(req.params.id)

  const existingProduct = await getProductByIdDb(id)

  if (!existingProduct) {
    throw new NotFoundError('Product not found')
  }

  const { name, description } = req.body

  if (!name || !description) {
    throw new BadRequestError('Missing fields in request body')
  }

  const product = await updateProductByIdDb(id, name, description)

  return res.json({
    product,
  })
}

const deleteProductById = async (req, res) => {
  const id = Number(req.params.id)

  const existingProduct = await getProductByIdDb(id)

  if (!existingProduct) {
    throw new NotFoundError('Product not found')
  }

  const product = await deleteProductByIdDb(id)

  return res.json({
    product,
  })
}

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
}
