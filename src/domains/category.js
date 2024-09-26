import { prisma } from '../utils/prisma.js'

const getAllCategoriesDb = async () => {
  return await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  })
}

const getCategoryByIdDb = async (categoryId) => {
  return await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      products: {
        include: {
          variants: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  })
}

const createCategoryDb = async (name) => {
  return await prisma.category.create({
    data: {
      name: name,
    },
  })
}

const updateCategoryByIdDb = async (categoryId, name) => {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: name,
    },
  })
}

const deleteCategoryByIdDb = async (categoryId) => {
  return await prisma.category.delete({
    where: {
      id: categoryId,
    },
  })
}

const addProductToCategoryByIdDb = async (
  categoryName,
  categoryId,
  productId
) => {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: categoryName,
      products: {
        connect: {
          id: productId,
        },
      },
    },
  })
}

const deleteProductFromCategoryByIdDb = async (
  categoryName,
  categoryId,
  productId
) => {
  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: categoryName,
      products: {
        disconnect: {
          id: productId,
        },
      },
    },
  })
}

export {
  getAllCategoriesDb,
  getCategoryByIdDb,
  createCategoryDb,
  updateCategoryByIdDb,
  deleteCategoryByIdDb,
  addProductToCategoryByIdDb,
  deleteProductFromCategoryByIdDb,
}
