import {
  addProductToCategoryByIdDb,
  createCategoryDb,
  deleteCategoryByIdDb,
  deleteProductFromCategoryByIdDb,
  getAllCategoriesDb,
  getCategoryByIdDb,
  updateCategoryByIdDb,
} from '../domains/category.js'
import { getProductByIdDb } from '../domains/product.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getAllCategories = async (req, res) => {
  const categories = await getAllCategoriesDb()

  return res.json({
    categories,
  })
}

const getCategoryById = async (req, res) => {
  const categoryId = Number(req.params.id)

  const category = await getCategoryByIdDb(categoryId)

  if (!category) {
    throw new NotFoundError('Category not found')
  }

  return res.json({
    category,
  })
}

const createCategory = async (req, res) => {
  const { name } = req.body

  if (!name) {
    throw new BadRequestError('Missing fields in request body')
  }

  if (typeof name !== 'string') {
    throw new BadRequestError('Name must be a string')
  }

  const category = await createCategoryDb(name)

  return res.status(201).json({
    category,
  })
}

const updateCategoryById = async (req, res) => {
  const categoryId = Number(req.params.id)

  const existingCategory = await getCategoryByIdDb(categoryId)

  if (!existingCategory) {
    throw new NotFoundError('Category not found')
  }

  const { name } = req.body

  if (!name) {
    throw new BadRequestError('Missing fields in request body')
  }

  const category = await updateCategoryByIdDb(categoryId, name)

  return res.json({
    category,
  })
}

const deleteCategoryById = async (req, res) => {
  const categoryId = Number(req.params.id)

  const existingCategory = await getCategoryByIdDb(categoryId)

  if (!existingCategory) {
    throw new NotFoundError('Category not found')
  }

  const category = await deleteCategoryByIdDb(categoryId)

  return res.json({
    category,
  })
}

const addProductToCategoryById = async (req, res) => {
  const categoryId = Number(req.params.id)

  const existingCategory = await getCategoryByIdDb(categoryId)

  if (!existingCategory) {
    throw new NotFoundError('Category not found')
  }

  const { productId } = req.body

  if (!productId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const product = await getProductByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  if (existingCategory.products.some((p) => p.id === product.id)) {
    throw new NotFoundError('Product already in')
  }

  const category = await addProductToCategoryByIdDb(
    existingCategory.name,
    categoryId,
    productId
  )

  return res.json({
    category,
  })
}

const deleteProductFromCategoryById = async (req, res) => {
  const categoryId = Number(req.params.id)

  const existingCategory = await getCategoryByIdDb(categoryId)

  if (!existingCategory) {
    throw new NotFoundError('Category not found')
  }

  const { productId } = req.body

  if (!productId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const product = await getProductByIdDb(productId)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  if (!existingCategory.products.some((p) => p.id === product.id)) {
    throw new NotFoundError('Product not in')
  }

  const category = await deleteProductFromCategoryByIdDb(
    existingCategory.name,
    categoryId,
    productId
  )

  return res.json({
    category,
  })
}

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  addProductToCategoryById,
  deleteProductFromCategoryById,
}
