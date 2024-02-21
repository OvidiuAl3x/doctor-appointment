import express from "express";
import Users from "../models/usersModel.js";

const router = express.Router();

// Route for Create a new Patient
router.post("/patient", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password)
      return res.status(400).send({
        message: "Send all required fields: email, password",
      });

    const patient = new Users({
      email: email,
      password: password,
      role: "patient",
      firstName: firstName,
      lastName: lastName,
    });

    await patient.save();
    return res.status(201).json(patient);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for Edit a Patient
router.put("/patient/:id", async (req, res) => {
  try {
    const patientId = req.params.id;

    const { email, password, firstName, lastName } = req.body;

    const existingPatient = await Users.findById(patientId);

    if (!existingPatient) {
      return res.status(404).send({ message: "Patient not found" });
    }

    if (email) existingPatient.email = email;
    if (password) existingPatient.password = password;
    if (firstName) existingPatient.firstName = firstName;
    if (lastName) existingPatient.lastName = lastName;

    await existingPatient.save();

    return res.status(200).json(existingPatient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Route for GET ALL Patients
router.get("/", async (req, res) => {
  try {
    const patients = await Users.find({ role: "patient" })
      .populate({
        path: "reviews",
        populate: {
          path: "doctor",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "appointments",
        populate: {
          path: "doctor",
          select: "firstName lastName",
        },
      });

    return res.status(200).json({
      count: patients.length,
      data: patients,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for GET One Patient by id
router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Users.findOne({
      _id: patientId,
      role: "patient",
    })
      .populate({
        path: "reviews",
        populate: {
          path: "doctor",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "appointments",
        populate: {
          path: "doctor",
          select: "firstName lastName",
        },
      });

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    return res.status(200).json(patient);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for Delete Patient
router.delete("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Users.findOneAndDelete({
      _id: patientId,
      role: "patient",
    });

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    return res.status(200).send({ message: "Patient deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
