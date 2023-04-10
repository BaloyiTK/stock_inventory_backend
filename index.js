import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import erroHanndler from "./middlewares/errorMiddleware.js";
import cookieParser from 'cookie-parser';

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
app.get("/", (req, res) => {
  res.send("home page");
});
app.use("/api/user", userRouter)

dotenv.config();
const uri = process.env.DATABASE_URI;
const PORT = process.env.PORT || 5000;

app.use(erroHanndler)

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("database connected successful");
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err.message);
  });
