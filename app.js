
require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const connectDB = require('./db/connect')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const reviewRouter = require('./routes/review')
const errorHandler = require('./middleware/error-handler')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000
app.use(cookieParser(process.env.JWT_SECRET))
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/order',orderRouter)
app.use('/api/v1/review',reviewRouter)

app.use(errorHandler)
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
    app.listen(PORT,()=>{
        console.log(`app is listening to port ${PORT}`)
    })
    }catch(err){
        console.log(err)
    }
    
}

start()