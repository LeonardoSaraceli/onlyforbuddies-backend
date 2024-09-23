import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import cors from 'cors'
import userRoute from './routes/user.js'
import productRoute from './routes/product.js'
import variantRoute from './routes/variant.js'
import cartRoute from './routes/cart.js'
import ApiError from './errors/ApiError.js'

export const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/variants', variantRoute)
app.use('/cart', cartRoute)

app.use((error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: error.message,
    })
  }

  res.status(500).json({
    error: 'Server error',
  })
})
