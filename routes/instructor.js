// Name: Daniel Yoh
// Date: 11.22.2022
// Course: CS 355
// This file is for all getting instructor-related pages on the website, and checks the user's account type before letting them into that page.

const express = require('express')
const router = express.Router()
const Person = require("../database.js").PersonModel;
const Course = require("../database.js").CourseModel;
const SubmAssgn = require("../database.js").SubmAssgnModel;

router.get('/createassignment', loggedin, instructorcheck, (req, res) => {
  res.render('createassignment.ejs');
})

router.get('/createcourse', loggedin, instructorcheck, (req, res) => {
  res.render('createcourse.ejs');
})

router.get('/editcourse', loggedin, instructorcheck, async (req, res) => {
  const data = await Course.find({ creator: req.user.id })
  res.render('editcourse.ejs', { data });
})

router.get('/gradelist', loggedin, instructorcheck, async (req, res) => {
  const assigndata = await SubmAssgn.find({ creatorid: req.user.id })
  console.log(assigndata)
  res.render('gradelist.ejs', { assigndata });
})

router.get('/acceptreject', loggedin, instructorcheck, (req, res) => {
  res.render('acceptreject.ejs');
})

router.get('/studentroster', loggedin, instructorcheck, async (req, res) => {
  const data = await Course.find({ creatorid: req.user.id });
  console.log(data)
  res.render('studentroster.ejs', { data });
})

router.get('/selectedcourse', loggedin, instructorcheck, (req, res) => {
  res.render('selectedcourse.ejs');
})

function loggedin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function instructorcheck(req, res, next) {
  if (req.user.accounttype != "Instructor") return res.redirect('/')
  next();
}

module.exports = router
