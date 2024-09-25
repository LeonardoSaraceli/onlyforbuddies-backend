import { prisma } from '../utils/prisma.js'

const createUserAddressByIdDb = async (
  userId,
  street,
  number,
  complement,
  region,
  city,
  state,
  country,
  zip
) => {
  return await prisma.address.create({
    data: {
      user_id: userId,
      street: street,
      number: number,
      complement: complement,
      region: region,
      city: city,
      state: state,
      country: country,
      zip: zip,
    },
  })
}

const deleteUserAddressByIdDb = async (userId, addressId) => {
  return await prisma.address.delete({
    where: {
      id: addressId,
      user_id: userId,
    },
  })
}

export { createUserAddressByIdDb, deleteUserAddressByIdDb }
