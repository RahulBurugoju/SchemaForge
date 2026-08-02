import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import { notFound } from "./middlewares/notFound.middleware.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import authRouter from "./routes/auth.route.js"
import projectRouter from './routes/project.route.js'

const app = express();

app.use(express.json({ limit: "16kb" }))
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())


app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

// routes 
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/projects", projectRouter)


// 404 Not Found Middleware
app.use(notFound)

// Centralized Error Handling Middleware
app.use(errorHandler)

export default app