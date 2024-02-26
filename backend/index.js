// index.js
import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import doctorRoute from "./routes/doctorsRoute.js";
import patientRoute from "./routes/patientsRoute.js";
import reviewsRoute from "./routes/reviewsRoute.js";
import appointmentsRoute from "./routes/appointmentRoute.js";
import loginRoute from "./routes/loginRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:8081",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add your routes here

app.use("/login", loginRoute);

app.use("/doctors", doctorRoute);

app.use("/patients", patientRoute);

app.use("/reviews", reviewsRoute);

app.use("/appointments", appointmentsRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
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
    console.error(err);
  });
