import express from "express";
import User from "../models/usersModel.js";
import Appointment from "../models/appointmentModel.js";

const router = express.Router();

// Route for Create a new appointment
router.post("/postAppointment", async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;
    const appointment = new Appointment({
      // maybe hear instead of patient to be patientId and aswell for doctor
      //   we know when create front end
      patient: patientId,
      doctor: doctorId,
      date,
      status: "pending",
    });

    await appointment.save();

    await User.findByIdAndUpdate(doctorId, {
      $push: { appointments: appointment._id },
    });

    await User.findByIdAndUpdate(patientId, {
      $push: { appointments: appointment._id },
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Route for Update a appointment
router.put("/updateAppointment/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const { date, status } = req.body;

    const existingAppointment = await Appointment.findById(appointmentId);

    if (!existingAppointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    if (date) existingAppointment.rating = date;
    if (status) existingAppointment.status = status;

    await existingAppointment.save();

    return res.status(200).json(existingAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for GET One appointment by id
router.get("/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment)
      return res.status(404).json({ message: "Review not found" });

    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Route for Delete One appointment by id
router.delete("/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment)
      return res.status(404).json({ message: "Review not found" });

    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
