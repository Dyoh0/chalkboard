// Name: Daniel Yoh
// Date: 11.25.2022
// Course: CS 355
// This is the database.js file of our website, and is for information related to the website's database.

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user:qrnw4uBf6f3RWKnT@cluster0.nl8r4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accounttype: { type: String, required: true },
});

let Person = mongoose.model('Person', personSchema);

const courseSchema = new Schema({
  coursename: { type: String, required: true },
  instructors: { type: String, required: true },
  coursedesc: { type: String, required: true },
});

let Course = mongoose.model('Course', courseSchema);

// const assignmentSchema = new Schema({
// });
// let Assignment = mongoose.model('Assignment', assignmentSchema);
// exports.CourseModel = Course;
// exports.AssignmentModel = Assignment;

exports.PersonModel = Person;
exports.CourseModel = Course;