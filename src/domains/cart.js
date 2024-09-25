import { prisma } from '../utils/prisma.js'
import { getProductByIdDb } from './product.js'

const getCartByIdDb = async (cartId) => {
  return await prisma.cart.findUnique({
    where: {
      id: cartId,
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

const addProductToCartDb = async (cartId, productId, existingProduct) => {
  const existingProductInCart = await prisma.productCart.findFirst({
    where: {
      cart_id: cartId,
      variant_id: productId,
    },
    include: {
      variant: true,
    },
  })

  if (existingProductInCart) {
    return await prisma.productCart.update({
      where: {
        id: existingProductInCart.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
        cart: {
          update: {
            total: {
              increment: existingProductInCart.variant.price,
            },
          },
        },
      },
    })
  }

  return await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      products: {
        create: {
          quantity: 1,
          variant_id: productId,
        },
      },
      total: {
        increment: existingProduct.price,
      },
    },
  })
}

const decrementCartTotal = async (cartId, price) => {
  await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      total: {
        decrement: price,
      },
    },
  })
}

const removeProductCartTotal = async (cartId, price, quantity) => {
  await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      total: {
        decrement: price * quantity,
      },
    },
  })
}

const deleteProductFromCartDb = async (cartId, productId, price, quantity) => {
  await removeProductCartTotal(cartId, price, quantity)

  return await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      products: {
        delete: {
          id: productId,
        },
      },
    },
  })
}

const verifyProductInCartDb = async (cartId, productId) => {
  return await prisma.productCart.findFirst({
    where: {
      cart_id: cartId,
      variant_id: productId,
    },
  })
}

const removeProductFromCartDb = async (
  cartId,
  isProductInCart,
  existingProduct
) => {
  if (isProductInCart.quantity > 1) {
    await decrementCartTotal(cartId, existingProduct.price)

    return await prisma.productCart.update({
      where: {
        id: isProductInCart.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    })
  }

  await deleteProductFromCartDb(
    cartId,
    isProductInCart.id,
    existingProduct.price,
    isProductInCart.quantity
  )
}

const getProductCartByIdDb = async (cartId, productId) => {
  return await prisma.productCart.findFirst({
    where: {
      cart_id: cartId,
      variant_id: productId,
    },
  })
}

const clearCartProductsByIdDb = async (cartId, productId) => {
  const productCart = await getProductCartByIdDb(cartId, productId)

  await prisma.productCart.delete({
    where: {
      id: productCart.id,
    },
  })

  const variant = await prisma.variant.findFirst({
    where: {
      id: productId,
    },
  })

  return prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      total: {
        decrement: variant.price * productCart.quantity,
      },
    },
  })
}

export {
  getCartByIdDb,
  addProductToCartDb,
  verifyProductInCartDb,
  removeProductFromCartDb,
  deleteProductFromCartDb,
  clearCartProductsByIdDb,
}
