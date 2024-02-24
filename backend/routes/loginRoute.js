import express from "express";
import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Route for Login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Send all required fields: email, password" });
    }
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).send({ message: "Invalid password" });
    }
    const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
