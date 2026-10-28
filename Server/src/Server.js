import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.routes.js'
import connectDB from './lib/db.js'
dotenv.config()

const app = express()
const __dirname = path.resolve()
connectDB()

const PORT = process.env.PORT

app.use('/api/auth',authRoutes)

//make ready to deploy
if (process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../Client/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../Client","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})