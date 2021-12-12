// Name: Daniel Yoh
// Date: 11.25.2022
// Course: CS 355
// This is for backend functionality of the admin page.
const express = require('express')
const router = express.Router()

const Person = require("../database.js").PersonModel;
const Course = require("../database.js").CourseModel;
const Search = require("../database.js").SearchModel;
const Assignment = require("../database.js").AssignmentModel;

router.get('/adminpage', loggedin, (req, res) => {
  if (req.user.accounttype != "Admin") res.redirect('/')
  Person.find({}, (err, data) => {
    if (err) console.log(err);
    else {
      const userdata = data
      Search.find({}, (err, data) => {
        if (err) console.log(err);
        else {
          const searchdata = data;
          Course.find({}, (err, data) => {
            if (err) console.log(err);
            else {
              const coursedata = data;
              Assignment.find({}, (err, data) => {
                if (err) console.log(err);
                else {
                  const assignmentdata = data;
                  res.render('adminpage.ejs', { userdata, searchdata, coursedata, assignmentdata });
                }
              })
            }
          })
        }
      })
    }
  })
})

function loggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router
