import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import authRoute from './Routers/authRouter.js'
import categoryRoute from './Routers/categoryRouter.js'

dotenv.config();


const app = express();

connectDB();

app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  
  app.use(express.json());

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

  app.get("/", (req, res) => {
    res.send("Welcome to the API");
  });

  app.use("/api/auth", authRoute);
  app.use("/api", categoryRoute)

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on the port`);
  });