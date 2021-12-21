// Name: Daniel Yoh
// Date: 12.06.2022
// Course: CS 355
// This file is for all post requests related to instructor pages.

const express = require('express')
const router = express.Router()
const Person = require("../database.js").PersonModel;
const Course = require("../database.js").CourseModel;
const Search = require("../database.js").SearchModel;
const Assignment = require("../database.js").AssignmentModel;
const SubmAssgn = require("../database.js").SubmAssgnModel;
const Grades = require("../database.js").GradesModel;

router.use(express.static(__dirname + '../public'));

router.post('/createcourse', loggedin, async (req, res) => {
  console.log("reqbody:", req.body);
  console.log("accounttype:", req.user.accounttype);

  const exists = await Course.exists({ coursename: req.body.coursename });
  if (exists) {
    return res.send('This course name is already in use.');
  };
  let newcourse;
  if (req.body.instructor == "") {
    newcourse = new Course({
      coursename: req.body.coursename,
      creatorid: req.user.id,
      creatorname: req.user.fname + " " + req.user.lname,
      coursedesc: req.body.coursedescription
    });
  }
  else {
    newcourse = new Course({
      coursename: req.body.coursename,
      creatorid: req.user.id,
      creatorname: req.user.fname + " " + req.user.lname,
      instructors: req.body.instructor,
      coursedesc: req.body.coursedescription
    });
  }
  newcourse.save((err, data) => {
    if (err) return console.log(err);
    console.log(newcourse.coursename + newcourse.id + " saved to database.  FINALLY.");
    console.log(data)
  });
  res.redirect('/course/' + newcourse.id);

})

router.get('/course/:id', loggedin, async (req, res) => {
  let data = await Course.findById(req.params.id);
  let enrolled = false;
  if (!data) res.send("Course does not exist.");
  else {
    if (req.user.accounttype == "Student") {
      Course.find({ _id: req.params.id, students: req.user.id }, (err, notenrolled) => {
        if (notenrolled == "") {
          res.render('course.ejs', {
            data: {
              coursename: data.coursename,
              coursedesc: data.coursedesc,
              id: data.id
            }
          })
        }
        else {
          enrolled = true;
          const url = req.url;
          Assignment.find({ courseid: req.params.id }, (err, assignmentdata) => {
            if (!assignmentdata) res.send("Assignment doesn't exist.");
            else {
              res.render('course.ejs', { data, assignmentdata, url, enrolled })
            }
          })
        }
      })
    }
    else {
      Course.find({
        courseid: req.params.id, $or: [
          { creatorid: req.user.id },
          { instructors: req.user.id }
        ]
      }, (err, notassigned) => {
        if (notassigned == "") {
          console.log("notassigned:", req.user.id)
          res.render('course.ejs', {
            data: {
              coursename: data.coursename,
              coursedesc: data.coursedesc,
              id: data.id
            }
          })
        }
        else {
          console.log("Youre a wizard, Harry.");
          const url = req.url;
          Assignment.find({ courseid: req.params.id }, (err, assignmentdata) => {
            if (err) console.log(err);
            else {
              res.render('course.ejs', { data, assignmentdata, url, enrolled })
            }
          })
        }
      })
    }
  }
})

router.post('/createassignment', loggedin, async (req, res) => {
  console.log("reqbody:", req.body);
  console.log("accounttype:", req.user.accounttype);

  const questionarray = req.body.inputquestion;
  const answerarray = req.body.inputanswer;

  Course.findById({ _id: req.body.inputcourseid }, (err, coursedata) => {
    if (err) res.send("Course does not exist.")
    else {
      const newassignment = new Assignment({
        assignmentname: req.body.inputassignmenttitle,
        assignmentdesc: req.body.inputdesc,
        questions: questionarray,
        answers: answerarray,
        duedate: req.body.duedate,
        courseid: req.body.inputcourseid
      });
      newassignment.save((err, data) => {
        if (err) return console.log(err);
        else {
          console.log(newassignment.assignmentname + newassignment.id + " saved to database.  FINALLY.");
          console.log(data);
          coursedata.assignments.push(data.id);
          coursedata.save((err, success) => {
            if (err) console.log(err);
            else res.redirect('/course/' + req.body.inputcourseid + '/assignment/' + data.id);
          })
        }
      });
    }
  })
})

router.get('/course/:courseid/assignment/:id', loggedin, async (req, res) => {
  // Only enrolled students can submit assignments
  let studentcheck = false;
  let studentid;
  let url = req.url;
  // If student already submitted assignment, 'submit' button disappears.
  let assigncheck = await SubmAssgn.findOne({ assid: req.params.id, studentid: req.user.id });
  if (assigncheck == null) assigncheck = false;
  let alreadygraded;
  let grades;
  if (req.user.accounttype == 'Student') {
    grades = await Grades.findOne({ courseid: req.params.courseid, assid: req.params.id, studentid: req.user.id })
    if (grades != null) alreadygraded = true;
    else alreadygraded = false;
  }
  console.log(grades, "\n", alreadygraded);
  Course.findById(req.params.courseid, (err, coursedata) => {
    if (!coursedata) res.send("Course does not exist.");
    else {
      Assignment.findById(req.params.id, (err, data) => {
        if (!data) res.send("Assignment does not exist.");
        else {
          if (coursedata.students.includes(req.user.id)) {
            studentcheck = true;
            studentid = req.user.id;
          }
          console.log(data);
          res.render('assignment.ejs', { accounttype: req.user.accounttype, data, studentcheck, studentid, url, assigncheck, alreadygraded, grades })
        }
      })
    }
  })
})

router.post('/course/:id', loggedin, async (req, res) => {
  Course.findById(req.params.id, async (err, coursedata) => {
    if (!coursedata) res.send("An error has occurred.");
    else {
      if (req.user.id == coursedata.creatorid) {
        res.send("Enrolling in a course you signed up for sounds like a bad idea.")
      }
      else {
        const updateuser = await Person.updateOne({ _id: req.user.id }, { $addToSet: { enrolledcourses: [req.params.id] } });
        const updatecourse = await Course.updateOne({ _id: req.params.id }, { $addToSet: { students: [req.user.id] } })
        res.redirect('/course/' + req.params.id);
      }
    }
  })
})

router.post('/course/:courseid/assignment/:assid/:id', loggedin, async (req, res) => {
  let instrucid = await Course.findById(req.params.courseid);
  let submitted = new SubmAssgn({
    answers: req.body.answer,
    courseid: req.params.courseid,
    studentid: req.params.id,
    assid: req.params.assid,
    creatorid: instrucid.creatorid
  });

  submitted.save((err, data) => {
    if (err) return err;
    console.log(data)
  });
  let url = '/course/' + req.params.courseid + '/assignment/' + req.params.assid + '/';
  res.redirect(url);
});

// Gets instructor's view of student answers
router.get('/course/:courseid/assignment/:assid/:id', loggedin, instructorcheck, async (req, res) => {
  let data = await Assignment.findById(req.params.assid)
  let stanswers = await SubmAssgn.find({ assid: req.params.assid, studentid: req.params.id });
  let name = await Person.findById(req.params.id);
  res.render('grading.ejs', { data, stanswers, name, url: req.url })
})

router.post('/course/:courseid/assignment/:assid/:studid/graded', loggedin, instructorcheck, async (req, res) => {
  let qstns = req.body;
  let qstn = Object.assign({}, qstns);
  delete qstn['feedback'];
  delete qstn['grade'];
  delete qstn['submit'];
  let corrects = JSON.stringify(qstn);
  corrects = JSON.parse(corrects);
  let instrucid = await Course.findById(req.params.courseid);
  let graded = new Grades({
    "corrects": corrects,
    "feedback": req.body.feedback,
    "grade": req.body.grade,
    "courseid": req.params.courseid,
    "studentid": req.params.studid,
    "assid": req.params.assid,
    "creatorid": instrucid.creatorid
  });
  const submid = await SubmAssgn.findOne({ courseid: req.params.courseid, studentid: req.params.studid, assid: req.params.assid });
  const status = await SubmAssgn.findByIdAndDelete(submid._id);
  graded.save(async (err, data) => {
    if (err) return console.log(err);
    res.redirect('/gradelist');
  });
});

function loggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function instructorcheck(req, res, next) {
  if (req.user.accounttype != "Instructor") return res.redirect('/')
  next();
}

module.exports = router
