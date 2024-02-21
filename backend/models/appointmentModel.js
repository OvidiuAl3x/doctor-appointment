import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  date: Date,
  status: { type: String, enum: ["pending", "accepted", "rejected"] },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
