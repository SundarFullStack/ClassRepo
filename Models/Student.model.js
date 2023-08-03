const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  studentName: { type: String, required: true },
  subject: { type: String, required: true },
  mentorName: { type: String, required: true },
  Batch: { type: String, required: true },
  mentorId: { type: String, required: false },
  previousMentorName: { type: String, required: false },
  studentId:{type:Number,required:true}
});

module.exports = mongoose.model("students", studentSchema);
