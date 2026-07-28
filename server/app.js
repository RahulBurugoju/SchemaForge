import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())
app.get('/',(req,res)=>{
    console.log("The server is running!!!!")
    res.send("The server is running!!!!")
})

app.listen(port, ()=>{
    console.log(`server is live on port: ${port}`)
})