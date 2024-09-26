import { Router } from 'express'
import { isAdmin, isTokenValid } from '../middleware/auth.js'
import {
  addProductToCategoryById,
  createCategory,
  deleteCategoryById,
  deleteProductFromCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from '../controllers/category.js'

const route = Router()

route.get('/', getAllCategories)
route.get('/:id', getCategoryById)
route.post('/', isTokenValid, isAdmin, createCategory)
route.put('/:id', isTokenValid, isAdmin, updateCategoryById)
route.put('/:id/add-product', isTokenValid, isAdmin, addProductToCategoryById)
route.put(
  '/:id/delete-product',
  isTokenValid,
  isAdmin,
  deleteProductFromCategoryById
)
route.delete('/:id', isTokenValid, isAdmin, deleteCategoryById)

export default route
