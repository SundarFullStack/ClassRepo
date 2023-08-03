const mongoose = require("mongoose");
const { Schema } = mongoose;

const mentorSchema = new Schema({
  mentorName: { type: String, required: true },
  subject: { type: String, required: true },
  studentsList: { type: Array, required: false },
  Batch: { type: String, required: true },
});

module.exports = mongoose.model("mentor", mentorSchema);
