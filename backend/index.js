import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
await connectDB()

const PORT = process.env.PORT || 5001
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/',(req,res)=>{
    res.send("hello")
})


app.listen(PORT , ()=> console.log(`Server Running on Port : ${PORT}`))