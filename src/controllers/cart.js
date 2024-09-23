import {
  addProductToCartDb,
  deleteProductFromCartDb,
  getCartByIdDb,
  removeProductFromCartDb,
  verifyProductInCartDb,
} from '../domains/cart.js'
import { getVariantByIdDb } from '../domains/variant.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getCartById = async (req, res) => {
  const cartId = Number(req.params.id)

  const cart = await getCartByIdDb(cartId)

  if (!cart) {
    throw new NotFoundError('Cart not found')
  }

  return res.json({
    cart,
  })
}

const addProductToCart = async (req, res) => {
  const cartId = Number(req.params.id)

  const existingCart = await getCartByIdDb(cartId)

  if (!existingCart) {
    throw new NotFoundError('Cart not found')
  }

  const { productId } = req.body

  if (!productId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const existingProduct = await getVariantByIdDb(productId)

  if (!existingProduct) {
    throw new NotFoundError('Product not found')
  }

  const cart = await addProductToCartDb(cartId, productId, existingProduct)

  return res.json({
    cart,
  })
}

const removeProductFromCart = async (req, res) => {
  const cartId = Number(req.params.id)

  const existingCart = await getCartByIdDb(cartId)

  if (!existingCart) {
    throw new NotFoundError('Cart not found')
  }

  const { productId } = req.body

  if (!productId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const existingProduct = await getVariantByIdDb(productId)

  if (!existingProduct) {
    throw new NotFoundError('Product not found')
  }

  const isProductInCart = await verifyProductInCartDb(cartId, productId)

  if (!isProductInCart) {
    throw new NotFoundError('Product not found in cart')
  }

  const cart = await removeProductFromCartDb(
    cartId,
    isProductInCart,
    existingProduct
  )

  return res.json({
    cart,
  })
}

const deleteProductFromCart = async (req, res) => {
  const cartId = Number(req.params.id)

  const existingCart = await getCartByIdDb(cartId)

  if (!existingCart) {
    throw new NotFoundError('Cart not found')
  }

  const { productId } = req.body

  if (!productId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const existingProduct = await getVariantByIdDb(productId)

  if (!existingProduct) {
    throw new NotFoundError('Product not found')
  }

  const isProductInCart = await verifyProductInCartDb(cartId, productId)

  if (!isProductInCart) {
    throw new NotFoundError('Product not found in cart')
  }

  const cart = await deleteProductFromCartDb(
    cartId,
    productId,
    existingProduct.price,
    isProductInCart.quantity
  )

  return res.json({
    cart,
  })
}

export {
  getCartById,
  addProductToCart,
  removeProductFromCart,
  deleteProductFromCart,
}
