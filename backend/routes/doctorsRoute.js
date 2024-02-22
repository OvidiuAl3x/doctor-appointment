import express from "express";
import Users from "../models/usersModel.js";

const router = express.Router();

// Route for Create a new doctor
router.post("/doctor", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      aboutMe,
      fieldActivity,
      hospital,
      schedule,
    } = req.body;

    if (!email || !password)
      return res.status(400).send({
        message: "Send all required fields: email, password",
      });

    const doctor = new Users({
      email: email,
      password: password,
      role: "doctor",
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      aboutMe: aboutMe,
      fieldActivity: fieldActivity,
      hospital: hospital,
      schedule: schedule,
    });

    await doctor.save();
    return res.status(201).json(doctor);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for Edit a doctor
router.put("/doctor/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;

    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      aboutMe,
      fieldActivity,
      hospital,
      schedule,
    } = req.body;

    const existingDoctor = await Users.findById(doctorId);

    if (!existingDoctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    if (email) existingDoctor.email = email;
    if (password) existingDoctor.password = password;
    if (firstName) existingDoctor.firstName = firstName;
    if (lastName) existingDoctor.lastName = lastName;
    if (phoneNumber) existingDoctor.phoneNumber = phoneNumber;
    if (aboutMe) existingDoctor.aboutMe = aboutMe;
    if (fieldActivity) existingDoctor.fieldActivity = fieldActivity;
    if (hospital) existingDoctor.hospital = hospital;
    if (schedule) existingDoctor.schedule = schedule;

    await existingDoctor.save();

    return res.status(200).json(existingDoctor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Route for GET ALL doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Users.find({ role: "doctor" })
      .populate({
        path: "reviews",
        populate: {
          path: "patient",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "appointments",
        populate: {
          path: "patient",
          select: "firstName lastName",
        },
      });

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
router.get("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Users.findOne({
      _id: doctorId,
      role: "doctor",
    })
      .populate({
        path: "reviews",
        populate: {
          path: "patient",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "appointments",
        populate: {
          path: "patient",
          select: "firstName lastName",
        },
      });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    return res.status(200).json(doctor);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for Delete doctor
router.delete("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Users.findOneAndDelete({
      _id: doctorId,
      role: "doctor",
    });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    return res.status(200).send({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
