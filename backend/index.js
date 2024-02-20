import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import doctorRoute from "./routes/doctorsRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add your routes here

app.use("/doctors", doctorRoute);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.staus(500).send("Something went wrong!");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
