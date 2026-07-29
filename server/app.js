import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import { notFound } from "./middlewares/notFound.middleware.js"
import { errorHandler } from "./middlewares/error.middleware.js"

const app = express();

app.use(express.json())
app.use(cors({origin: process.env.CORS_ORIGIN,credentials: true}))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});


// 404 Not Found Middleware
app.use(notFound)

// Centralized Error Handling Middleware
app.use(errorHandler)

export default app