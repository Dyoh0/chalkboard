// Name: Daniel Yoh
// Date: 11.22.2022
// Course: CS 355
// This file is for all getting instructor-related pages on the website, and checks the user's account type before letting them into that page.

const express = require('express')
const router = express.Router()

router.get('/createassignment', loggedin, instructorcheck, (req, res) => {
  res.render('createassignment.ejs');
})

router.get('/createcourse', loggedin, instructorcheck, (req, res) => {
  res.render('createcourse.ejs');
})

router.get('/editcourse', loggedin, instructorcheck, (req, res) => {
  res.render('editcourse.ejs');
})

router.get('/gradelist', loggedin, instructorcheck, (req, res) => {
  res.render('gradelist.ejs');
})

router.get('/grading', loggedin, instructorcheck, (req, res) => {
  res.render('grading.ejs');
})

router.get('/acceptreject', loggedin, instructorcheck, (req, res) => {
  res.render('acceptreject.ejs');
})

router.get('/studentroster', loggedin, instructorcheck, (req, res) => {
  res.render('studentroster.ejs');
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
