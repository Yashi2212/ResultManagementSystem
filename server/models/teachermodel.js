const mongoose = require("mongoose");

const { Schema } = mongoose;
const teacherSchema = new Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Teacher", teacherSchema);
 
// teacherSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     // For testing purposes, directly compare plain text passwords
//     return candidatePassword === this.password;
//   } catch (error) {
//     throw error;
//   }};

module.exports = mongoose.model("Teacher", teacherSchema);