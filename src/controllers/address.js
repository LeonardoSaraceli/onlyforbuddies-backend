import {
  createUserAddressByIdDb,
  deleteUserAddressByIdDb,
} from '../domains/address.js'
import { getUserByIdDb } from '../domains/user.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const createUserAddressById = async (req, res) => {
  const userId = Number(req.params.id)

  const user = await getUserByIdDb(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const { street, number, complement, region, city, state, country, zip } =
    req.body

  if (!street || !number || !region || !city || !state || !country || !zip) {
    throw new BadRequestError('Missing fields in request body')
  }

  if (zip.length !== 9) {
    throw new BadRequestError('Zip must have 9 digits')
  }

  const address = await createUserAddressByIdDb(
    userId,
    street,
    number,
    complement,
    region,
    city,
    state,
    country,
    zip
  )

  return res.status(201).json({
    address,
  })
}

const deleteUserAddressById = async (req, res) => {
  const userId = Number(req.params.id)

  const user = await getUserByIdDb(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const { addressId } = req.body

  if (!addressId) {
    throw new BadRequestError('Missing fields in request body')
  }

  if (!user.addresses.some((a) => a.id === addressId)) {
    throw new NotFoundError('Address not found')
  }

  const address = await deleteUserAddressByIdDb(userId, addressId)

  return res.json({
    address,
  })
}

export { createUserAddressById, deleteUserAddressById }
