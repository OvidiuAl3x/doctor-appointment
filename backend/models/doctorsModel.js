import mongoose from "mongoose";

const doctorsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    requierd: true,
  },
  lastName: {
    type: String,
    requierd: true,
  },
  aboutMe: {
    type: String,
    requierd: true,
  },
  fieldActivity: {
    type: String,
    requierd: true,
  },
  hospital: {
    type: String,
    requierd: true,
  },
  schedule: {
    type: String,
    requierd: true,
  },
  //   this after user schema created
  //   reviews: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Review",
  //     },
  //   ],
});

const Doctors = mongoose.model("Doctors", doctorsSchema);

export default Doctors;
