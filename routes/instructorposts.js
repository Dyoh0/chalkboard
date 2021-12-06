// Name: Daniel Yoh
// Date: 12.06.2022
// Course: CS 355
// This file is for all post requests related to instructor pages.

const express = require('express')
const router = express.Router()
const Course = require("../database.js").CourseModel;

router.use(express.static(__dirname + '../public'));

router.post('/createcourse', async (req, res) => {
  console.log("reqbody:", req.body);
  console.log("accounttype:",req.user.accounttype);

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

  // res.redirect('/course/' + newcourse.id)
  // res.redirect('/course/' + 1234)
})

router.get('/course/:id', loggedin, (req, res) => {
  Course.findById(req.params.id, (err, data) => {
    if (err) console.log("course/:id:", err);
    else res.render('course.ejs', {data})
  })
  // res.render('course.ejs')
})

function loggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router