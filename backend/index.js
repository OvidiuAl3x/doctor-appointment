// index.js
import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import doctorRoute from "./routes/doctorsRoute.js";
import patientRoute from "./routes/patientsRoute.js";
import reviewsRoute from "./routes/reviewsRoute.js";
import appointmentsRoute from "./routes/appointmentRoute.js";

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

app.use("/register", doctorRoute);
app.use("/doctors", doctorRoute);

app.use("/register", patientRoute);
app.use("/patients", patientRoute);

app.use("/reviews", reviewsRoute);

app.use("/appointments", appointmentsRoute);

app.get("/test", (req, res) => {
  res.status(200).send("Test route works!");
});

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
