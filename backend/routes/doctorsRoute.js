import express from "express";
import Doctors from "../models/doctorsModel.js";

const router = express.Router();

// Route for Save a new doctor
router.post("/", async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.firstName || !req.body.aboutMe)
      return res.status(400).send({
        message: "Send all required fields: first name, last name, about me",
      });

    const newDoctor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      aboutMe: req.body.aboutMe,
      fieldActivity: req.body.fieldActivity,
      hospital: req.body.hospital,
      schedule: req.body.schedule,
    };

    const doctor = await Doctors.create(newDoctor);
    return res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// ! Add a delete route

// Route for GET ALL doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctors.find();

    return res.status(200).json({
      count: doctors.length,
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for GET One doctor by id
router.get("/:doctorID", async (req, res) => {
  try {
    const { doctorID } = req.params;
    const doctor = await Doctors.findById(doctorID);
    return res.status(200).json(doctor);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for Delete doctor
router.delete("/:doctorID", async (req, res) => {
  try {
    const { doctorID } = req.params;
    const doctor = await Doctors.findByIdAndDelete(doctorID);

    if (!doctor) return res.status(400).json({ message: "Doctor not found" });

    return res.status(200).send({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
