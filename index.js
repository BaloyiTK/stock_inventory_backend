import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());

//Middlewares
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("home page");
});

dotenv.config();
const uri = process.env.DATABASE_URI;
const PORT = process.env.PORT || 5000;

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
