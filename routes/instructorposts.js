// Name: Daniel Yoh
// Date: 12.06.2022
// Course: CS 355
// This file is for all post requests related to instructor pages.

const express = require('express')
const router = express.Router()
const Course = require("../database.js").CourseModel;
const Search = require("../database.js").SearchModel;

router.use(express.static(__dirname + '../public'));

router.post('/createcourse', loggedin, async (req, res) => {
  console.log("reqbody:", req.body);
  console.log("accounttype:", req.user.accounttype);

  const exists = await Course.exists({ coursename: req.body.coursename });
  if (exists) {
    return res.send('This course name is already in use.');
  };
  // try {
  const newcourse = new Course({
    coursename: req.body.coursename,
    instructors: req.body.instructor,
    coursedesc: req.body.coursedescription
  });
  newcourse.save((err, data) => {
    if (err) return console.log(err);
    console.log(newcourse.coursename + newcourse.id + " saved to database.  FINALLY.");
    console.log(data)
  });
  res.redirect('/course/' + newcourse.id);
  // } catch {
  // }
})

router.get('/course/:id', loggedin, (req, res) => {
  Course.findById(req.params.id, (err, data) => {
    if (err) console.log("course/:id:", err);
    else res.render('course.ejs', { data })
  })
})

router.post('/searchresults', loggedin, (req, res) => {
  const searchterm = new Search({
    searchterm: req.body.searchterm
  });
  searchterm.save((err, data) => {
    if (err) return console.log(err);
    console.log(searchterm.coursename + searchterm.id + " saved to database.  FINALLY.");
    console.log(data)
  });
  res.send("Search successfully saved to DB.")
  // res.redirect('/searchresults')
})

function loggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router
