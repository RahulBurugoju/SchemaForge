import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.json())
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))


app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())



app.get('/', (req, res) => {
    console.log("The server is running!!!!")
    res.send("The server is running!!!!")
})


app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

export default app