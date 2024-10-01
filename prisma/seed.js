import { prisma } from '../src/utils/prisma.js'
import bcrypt from 'bcrypt'

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'leonardolodi09@gmail.com',
      password: await bcrypt.hash('123', 10),
      role: 'ADMIN',
      cart: {
        create: {
          total: 0.0,
        },
      },
    },
  })

  const product = await prisma.product.create({
    data: {
      name: 'The Buddies Strikes Again',
      description: 'Camisa de malha',
    },
  })

  const variant = await prisma.variant.create({
    data: {
      sku: '246/789/20',
      color: 'Off-white',
      hex: '#FAF9F6',
      price: 180.99,
      product_id: product.id,
    },
  })

  await prisma.image.create({
    data: {
      url: 'https://assets.wordans.pt/files/model_specifications/2011/6/29/6730/6730_original.png?1673622418',
      variant_id: variant.id,
    },
  })

  await prisma.address.create({
    data: {
      street: 'Rua Dr. Joaquim Pires de Lima',
      number: 100,
      complement: '2° andar direito',
      region: 'Paranhos',
      city: 'Porto',
      state: 'Porto',
      country: 'Portugal',
      zip: '12345-678',
      user_id: user.id,
    },
  })

  await prisma.size.createMany({
    data: [
      {
        size: 'P',
      },
      {
        size: 'M',
      },
      {
        size: 'G',
      },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      {
        stock: 12,
        size_id: 1,
        variant_id: 1,
      },
      {
        stock: 5,
        size_id: 2,
        variant_id: 1,
      },
      {
        stock: 8,
        size_id: 3,
        variant_id: 1,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
