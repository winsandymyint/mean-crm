--------
Student
--------
id*
username
email
password
avator_link
location
gender
birthday
about_me
websites
country

---------
Enrolment
---------
student_id*, couse_id*  (composive pk)
payment_id (fk)
startdate
enddate
enroled_date

--------
Course
--------
id*
Instructor_id (fk)
title
subtitle
language
category
instruction_level (beginer, intermediate, expert, all level)
duration
summary
cover_image
video
price
review

--------------
CourseCategory
--------------


--------
Delivery
--------
id*
student_id
delivery_date
status
------------
Certificate
------------


--------
Syllabus
--------
id
name
course_id (fk)

----------
Instructor
----------
id*
name
email
avator_link
location
gender
about
experience_in_course
year_of_teaching

--------
Payment
--------


----
Exam
----
type: (midterm, full, all)
couse_id (fk)
instructor_review

------
Result
------
mark
Instructor_id (fk)
student_id (fk)
exam_id
assignment_id

----------
Assignment
----------

