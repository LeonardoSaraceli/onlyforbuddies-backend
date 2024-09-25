import { getCartByIdDb } from '../domains/cart.js'
import {
  createUserOrderByIdDb,
  deleteUserOrderByIdDb,
  getAllOrdersDb,
  getOrderByIdDb,
} from '../domains/order.js'
import { getUserByIdDb } from '../domains/user.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getAllOrders = async (req, res) => {
  const orders = await getAllOrdersDb()

  return res.json({
    orders,
  })
}

const createUserOrderById = async (req, res) => {
  const { id } = req.user

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const { status } = req.body

  if (!status) {
    throw new BadRequestError('Missing fields in request body')
  }

  const cart = await getCartByIdDb(user.cart.id)

  if (cart.products.length < 1) {
    throw new BadRequestError('Cart is empty')
  }

  const order = await createUserOrderByIdDb(
    id,
    cart.total,
    status,
    cart.products,
    cart.id
  )

  return res.status(201).json({
    order,
  })
}

const deleteUserOrderById = async (req, res) => {
  const { orderId } = req.body

  if (!orderId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const existingOrder = await getOrderByIdDb(orderId)

  if (!existingOrder) {
    throw new NotFoundError('Order not found')
  }

  const order = await deleteUserOrderByIdDb(orderId)

  return res.json({
    order,
  })
}

export { getAllOrders, createUserOrderById, deleteUserOrderById }
