//importing mongoose
const mongoose = require("mongoose")
// schema represents the structure of a particular document
// Each schema maps to a MongoDB collection
const { Schema } = mongoose;

//Student schema
const studentSchema = new Schema(
  {
    rollno: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },  

  dob:{
    type:Date
  } ,
  
  score: {
    type: Number,
    min: 0,
    max: 100
},
role:{
  type:String,
  // enum:['student'],
  default:'student'
}
  },
{
    timestamps: true  // This will add createdAt and updatedAt fields
  }
  
);

//exporting the model
// A model defines a programming interface for interacting with the database (read, insert, update, etc).
module.exports = mongoose.model("Student", studentSchema)