import express from "express";
import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Route for Create a new Patient
router.post("/register", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { email, password, firstName, lastName, phoneNumber } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).send({
        message:
          "Send all required fields: email, password, firstName, lastName",
      });
    }
    const hashedPassword = await bcrypt.hash(password || "", 10);

    const patient = new Users({
      email,
      password: hashedPassword,
      role: "patient",
      firstName,
      lastName,
      phoneNumber,
    });

    await patient.save();

    const token = jwt.sign(
      { userId: patient._id, email: patient.email },
      "defaultSecretKey"
    );

    res.status(201).json(patient, token);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for Edit a Patient
router.put("/:id", async (req, res) => {
  try {
    const patientId = req.params.id;

    const { email, password, firstName, lastName, phoneNumber } = req.body;

    const existingPatient = await Users.findById(patientId);

    if (!existingPatient) {
      return res.status(404).send({ message: "Patient not found" });
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    if (email) existingPatient.email = email;
    if (password) existingPatient.password = hashedPassword;
    if (firstName) existingPatient.firstName = firstName;
    if (lastName) existingPatient.lastName = lastName;
    if (phoneNumber) existingPatient.phoneNumber = phoneNumber;

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
