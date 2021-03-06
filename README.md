# Site Link
https://chalkboard.danielyoh.repl.co/
# Contributions
## Daniel
### D0
I learned how to create basic schematics for a website.  A wireframe is essentially simple blueprints that provide visual representations for a site and its pages and functions, with labels for quickly explaining various modules.  I also learned that a sitemap is a map of all pages for a website, showing their relationships to convey how to get from one page to another.  Usually, the home page is the first page that gets worked on when planning a website.  The layout of a page should fit the page's function, but there should be some consistency in all pages, such as a common header, color scheme, and/or overall vibe.  These blueprints should be able to show the basic ideas of a site's structure and its pages, and their general purposes.  I should also be sure that the wireframes account for small screen sizes like mobile devices.  Overall, I learned how to create a wireframe and a sitemap to create a website.  
I created the GitHub repo, drew the sitemap, edit course, course, assignment, create assignment, and admin pages, and put together most of the readme for D0.
### D1
For D1, I put together the HTML for the pages I created.
### D2
For D2, I did the CSS for some pages and added responsiveness to others.
### D3
For D3, I implemented the signup, login, and logout functionalities.
 ### D4
For D4, I continued working on the backend.  Instructors can create courses, invite other instructors, delete courses, and students can enroll in courses and hand in assignments.  Students only see assignments if they're enrolled.  Instructors can view assignments that aren't graded yet on the gradelist page, grade them on the grading page, and students can see their grade on the assignment page when it is graded.  Otherwise, it says the student has already submitted.  Also put together the differences from the wireframes.
## Minjae
### D0
I came to realization that planning out your website via wireframing and sitemapping is an important step in creating a website. Before when i learned about wireframing and sitemapping, I was just doing my own projects in very unorganized way. I would have a very basic idea of what I want the website to look like and just tackle it head on. Throught this assignment, I have leanred wireframe is a draft for a website that represents the overall function and design while sitemap is list of pages that makes up the website. I found wiremapping to be very useful since it does give an overall layout.
In this project, I drew and designed homepage, sign-up, search, create course and student roster.
### D1
Creating an HTML complete design and layout of our website for D0 was definitely more straight forward and convenient for me to take reference and follow. Through this assignment, I have leanred the important of having a design structure to follow instead of just coding on top of my head. It feels like of like following a rough draft
when writing an essay. I would say writing the HTML code was much easier than actually trying to design the website because all I had to really do is follow the layout.
For this assignment, I created the pages for student roster, create course, edit course, selected course, admin view, and accept/reject page.
### D2
Created CSS for some of the pages and added feature lists for the each webpages in README.md
### D3
Created Unified Modeling Language diagram that connects the backend to the frontend to reflect the workflow of the website.

# Technologies used
For front-end, EJS and bootstrap were used to create the views and some of the CSS. Node.js was used for the backend along with Express and a bit of JQuery.  The database used was MongoDB, with Mongoose being used to create, read, update, and delete data to and from the database on the MongoDB cloud. 

# Wireframes
![wireframe1](https://github.com/Dyoh0/chalkboard/blob/main/designs/wireframes1.png?raw=true)
![wireframe2](https://github.com/Dyoh0/chalkboard/blob/main/designs/wireframes2.png?raw=true)
![wireframe3](https://github.com/Dyoh0/chalkboard/blob/main/designs/wireframes3.png?raw=true)
![wireframe4](https://github.com/Dyoh0/chalkboard/blob/main/designs/wireframes4.png?raw=true)
![wireframe5](https://github.com/Dyoh0/chalkboard/blob/main/designs/wireframes5.png?raw=true)
![wireframe6](https://github.com/Dyoh0/chalkboard/blob/main/designs/wireframes6.png?raw=true)

# Site Map
![sitemap](https://github.com/Dyoh0/chalkboard/blob/main/designs/sitemap.png?raw=true)

# Information
The purpose of this website is to create a platform for instructors to teach self-made courses to students through a distance-learning format.  Instructors create courses with curriculums and assignments, and students can search for and sign up for those courses and learn from assigned readings, videos, or any other medium chosen by the professor.  They can submit assignments to be graded.  Professors have access to student rosters for each of their courses.
There will be two types of accounts for students and instructors.  There will be a common header on every page with an icon that links back to the home page, and links to take the user to other pages.  Instructors can create multiple courses and assign multiple instructors to each, and can accept or deny students who choose to enroll in their courses.  
The contributors are Daniel Yoh and Minjae Kim.

# Features

## Accept Reject Page
Shows the instructor of which student applied for which courses along with the course ID. The instructor is given the option to accept or reject the student into enrollment.      
**Link - https://chalkboard.danielyoh.repl.co/acceptreject**


## Admin Page
It shows all the information about the student, instructor, courses and the database. The admin is able to control any function within the website because admin has the total control.      
**Link - https://chalkboard.danielyoh.repl.co/adminpage**


## Assignment Page
The assignment page shows the assigned work in which the student is supposed to complete. The student is able to write the answer, upload a file and save a draft before sumbitting an answer.      
![assignmentpage](https://github.com/Dyoh0/chalkboard/blob/main/designs/assignmentpage.png?raw=true)

## Course Page
The course page shows the description of the course and gives an option to apply for enrolling. Ultimately, it will be upto instructor to accept or reject the student via Accept Reject Page.
When accepted, the student is able to see all the assigned work within the course.      
![coursepage](https://github.com/Dyoh0/chalkboard/blob/main/designs/coursepage.png?raw=true)


## Create Assignment Page
Create Assignment page allows the instructor to create an assignment for the class. The instructor is able to add and delete question as he or she pleases, also, there is an option to assign a due date for any assignments.      
**Link - https://chalkboard.danielyoh.repl.co/createassignment**


## Create Course Page
An instructor is able to create a course he or she is willing to teach. There are three fields that must be field, course name, instructor name, and description. After everything has been filled, press confirm to create a new course.      
**Link - https://chalkboard.danielyoh.repl.co/createcourse**


## Edit Course Page
An instructor is able to edit any course he or she is in charge of.They are allowed to delete the course as well as leave the course for new instructor to take over.    
**Link - https://chalkboard.danielyoh.repl.co/editcourse**


## Gradelist and Grading Page
An instructor is able to view all the submits of assignments that are made by the students on the gradelist page, which can take the instructor to each individual submission through the Grade button. The instructor is able to mark them correct or incorrect and give student a grade that's most fit. Also, the instructor is able to leave a feedback/comment along with the grade.     
**Link - https://chalkboard.danielyoh.repl.co/gradelist**
![gradingpage](https://github.com/Dyoh0/chalkboard/blob/main/designs/gradingpage.png?raw=true)


## Index Page
The index page is collective of all pages in the website that both instructor and admin have access to. It gives all the options to edit, create, accept, reject and more.    
**Link - https://chalkboard.danielyoh.repl.co/**


## Login Page
The login page allow the admin, instructor and student to log in to the website. Depending on the credential of the login user, they are directed to their respective pages.    
**Link - https://chalkboard.danielyoh.repl.co/login**


## Search Result Page
Search result page allows for searching of courses that are available. Multiple selections of the courses can be made and when selected, press enroll to continue enrolling in desired courses.      
**Link - https://chalkboard.danielyoh.repl.co/searchresults**


## Selected Course Page
Selected course page is available to instructor and admin where editting of course name, course description and course instructors are allowed.      
![selectedcoursepage](https://github.com/Dyoh0/chalkboard/blob/main/designs/selectedcoursepage.png?raw=true)


## Signup Page
This page allows a new user to sign up as either a student or an instructor. Basic information like name, email and passwords are required. If the user already has an account, they can click signin instead in order to be redirected into a login page.     
**Link - https://chalkboard.danielyoh.repl.co/signup**


## Student Roster Page
Student roster page is available to instructor and admin where they are able to view all the students enrolled in a particular class. This page has an option to toggle between different classes with course selections.    
**Link - https://chalkboard.danielyoh.repl.co/studentroster**

# Differences
For an instructor, their index page also includes a 'Created Courses' section with accompanying links to make navigation easier.  The search and search results pages were fused together to make things simpler, but there's no checkboxes with an enrollment button since I couldn't figure out how to make that work.  The edit-course, file attachments, reopen, save draft, and accept/reject a student functionalities were not finished on time.  
