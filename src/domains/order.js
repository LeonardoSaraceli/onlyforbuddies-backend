import { prisma } from '../utils/prisma.js'
import { clearCartProductsByIdDb } from './cart.js'

const getAllOrdersDb = async () => {
  return await prisma.order.findMany({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      products: {
        include: {
          variant: true,
        },
      },
    },
  })
}

const createUserOrderByIdDb = async (
  userId,
  total,
  status,
  products,
  cartId
) => {
  const order = await prisma.order.create({
    data: {
      user_id: userId,
      total: total,
      status: status,
    },
    include: {
      products: {
        include: {
          variant: true,
        },
      },
    },
  })

  products.forEach(async (product) => {
    await prisma.productOrder.create({
      data: {
        order_id: order.id,
        variant_id: product.id,
        quantity: product.quantity,
      },
    })

    await clearCartProductsByIdDb(cartId, product.id)
  })

  return order
}

const getOrderByIdDb = async (orderId) => {
  return await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  })
}

const deleteUserOrderByIdDb = async (orderId) => {
  return await prisma.order.delete({
    where: {
      id: orderId,
    },
  })
}

export {
  getAllOrdersDb,
  createUserOrderByIdDb,
  getOrderByIdDb,
  deleteUserOrderByIdDb,
}
