import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js"


const app = express();

app.use(cors({ // explore the docs
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" })) // explore the docs

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public")) // to store some public data like favicon and etc

app.use(cookieParser())



// user routes
app.use("/api/v1/users", userRoutes);




export { app };
