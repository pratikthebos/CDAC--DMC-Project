DROP DATABASE IF EXISTS InstituteManagement;

CREATE DATABASE InstituteManagement;
USE InstituteManagement;


DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS Documents;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Assignments;
DROP TABLE IF EXISTS ExamsDetails;
DROP TABLE IF EXISTS Notices;
DROP TABLE IF EXISTS PaymentDetails;
DROP TABLE IF EXISTS StudentAssignments;





CREATE TABLE Roles
(
	roleId INT PRIMARY KEY AUTO_INCREMENT,
	roleName VARCHAR(10) UNIQUE NOT NULL	
);

INSERT INTO Roles(roleName)
VALUES
('Admin'), 
('Student'), 
('Faculty');




CREATE TABLE Courses
(
	courseId INT PRIMARY KEY AUTO_INCREMENT,
	courseName VARCHAR(50) NOT NULL,
	courseDesc	VARCHAR(100),
	status VARCHAR(20) DEFAULT 'Active'
);

INSERT INTO Courses (courseName, courseDesc) 
VALUES 
('B.Sc Science', 'Bachelor of Science Program'), 
('B.Com', 'Bachelor of Commerce Program'), 
('B.Tech', 'Bachelor of Technology Program');



CREATE TABLE Subjects
(
	subjectId INT PRIMARY KEY AUTO_INCREMENT,
	subjectName VARCHAR(20) NOT NULL,
	subjectDesc	 VARCHAR(100),
	courseId INT,
	FOREIGN KEY (courseId) REFERENCES Courses(courseId)
);

INSERT INTO Subjects (subjectName, subjectDesc, courseId) 
VALUES 
('Mathematics', 'Advanced Mathematics', 1), 
('Physics', 'Introduction to Physics', 1), 
('Economics', 'Basic Economics', 2), 
('Computer Science', 'Introduction to Programming', 3);



CREATE TABLE Student
(
	stdId INT PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE KEY NOT NULL,
	password VARCHAR(100) NOT null,
	courseId INT,
	address VARCHAR(100),
	photoImageName VARCHAR(100),
	birthDate DATE,
	gender CHAR(1),
	roleId INT,
	FOREIGN KEY (courseId) REFERENCES Courses(courseId),
	FOREIGN KEY (roleId) REFERENCES Roles(roleId)
);

INSERT INTO Student (firstName, lastName, email, password, courseId, address, photoImageName, birthDate, gender, roleId) 
VALUES 
('Rajesh', 'Kumar', 'rajesh.kumar@example.com', 'pass123', 1, '123 MG Road, Delhi', 'rajesh.jpg', '2000-02-15', 'M', 2),
('Priya', 'Sharma', 'priya.sharma@example.com', 'pass456', 2, '456 Brigade Road, Bangalore', 'priya.jpg', '1999-06-20', 'F', 2),
('Aditya', 'Verma', 'aditya.verma@example.com', 'pass789', 3, '789 Residency Road, Mumbai', 'aditya.jpg', '2001-11-10', 'M', 2);



CREATE TABLE faculty
(
    facultyId INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    courseId INT,
    address VARCHAR(100),
    photoImageName VARCHAR(100),
    birthDate DATE,
    gender CHAR(1),
    roleId INT,
    FOREIGN KEY (courseId) REFERENCES Courses(courseId),
    FOREIGN KEY (roleId) REFERENCES Roles(roleId)
);

INSERT INTO Faculty (firstName, lastName, email, password, courseId, address, photoImageName, birthDate, gender, roleId) 
VALUES 
('Anjali', 'Mehta', 'anjali.mehta@example.com', 'faculty123', 1, '123 MG Road, Delhi', 'anjali.jpg', '1985-03-22', 'F', 3),
('Ravi', 'Singh', 'ravi.singh@example.com', 'faculty456', 2, '456 Brigade Road, Bangalore', 'ravi.jpg', '1978-08-12', 'M', 3),
('Kavita', 'Iyer', 'kavita.iyer@example.com', 'faculty789', 3, '789 Residency Road, Mumbai', 'kavita.jpg', '1982-05-05', 'F', 3);


CREATE TABLE Documents
(
    docId INT PRIMARY KEY AUTO_INCREMENT,
    docName VARCHAR(100) NOT NULL,
    docType VARCHAR(100),
    stdId INT,
    FOREIGN KEY (stdId) REFERENCES Student(stdId)
);

INSERT INTO Documents (docName, docType, stdId) 
VALUES 
('Math Notes', 'PDF', 1), 
('Economics Workbook', 'Excel', 2), 
('Programming Basics', 'PDF', 3);


CREATE TABLE Help
(
    helpId INT PRIMARY KEY AUTO_INCREMENT,
    msgTxt VARCHAR(100) NOT NULL,
    stdId INT,
    FOREIGN KEY (stdId) REFERENCES Student(stdId)
);

INSERT INTO Help (msgTxt, stdId) 
VALUES 
('Unable to access assignments.', 1), 
('Payment status not updated.', 2);



CREATE TABLE Assignments
(
    assignId INT PRIMARY KEY AUTO_INCREMENT,
    assignName VARCHAR(100),
    assignDesc VARCHAR(100),
    publishDate DATETIME,
    dueDate DATE,
    courseId INT,
    subjectId INT,
    studentId INT,
    FOREIGN KEY (courseId) REFERENCES Courses(courseId),
    FOREIGN KEY (subjectId) REFERENCES Subjects(subjectId),
    FOREIGN KEY (studentId) REFERENCES Student(stdId)
);

INSERT INTO Assignments (assignName, assignDesc, publishDate, dueDate, courseId, subjectId, studentId) 
VALUES 
('Assignment 1', 'Math problems set', '2024-01-01 10:00:00', '2024-01-10', 1, 1, 1),
('Assignment 2', 'Economics analysis report', '2024-01-05 12:00:00', '2024-01-15', 2, 3, 2);


CREATE TABLE ExamsDetails (
    examId INT PRIMARY KEY AUTO_INCREMENT,
    examName VARCHAR(100) NOT NULL,
	examDate DATETIME,
	subjectId INT,
    courseId INT,
    FOREIGN KEY (courseId) REFERENCES Courses(courseId),
    FOREIGN KEY (subjectId) REFERENCES Subjects(subjectId)
);

INSERT INTO ExamsDetails (examName, examDate, subjectId, courseId) 
VALUES 
('Mid-Term Mathematics', '2024-03-01 09:00:00', 1, 1),
('Final Economics Exam', '2024-04-20 11:00:00', 3, 2);



CREATE TABLE Notices (
    noticeId INT PRIMARY KEY AUTO_INCREMENT,
    courseId INT,
    noticeText VARCHAR(100),
	facultyId INT,
    roleId INT,
	FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId),
    FOREIGN KEY (roleId) REFERENCES Roles(roleId),
    FOREIGN KEY (courseId) REFERENCES Courses(courseId)
);

INSERT INTO Notices (courseId, noticeText, facultyId, roleId) 
VALUES 
(1, 'Mid-term exams scheduled for March.', 1, 3), 
(2, 'Economics workshop on 15th Jan.', 2, 3);




CREATE TABLE PaymentDetails (
    paymentId INT PRIMARY KEY AUTO_INCREMENT,
    initialDate DATETIME,
    trnxCompleteDate DATETIME,
    trnxNo VARCHAR(100),
    amount DOUBLE,
    status VARCHAR(100),
    stdId INT,
    FOREIGN KEY (stdId) REFERENCES Student(stdId)
);

INSERT INTO PaymentDetails (initialDate, trnxCompleteDate, trnxNo, amount, status, stdId) 
VALUES 
('2024-01-01 10:00:00', '2024-01-02 12:00:00', 'TRX1001', 10000.00, 'Completed', 1),
('2024-02-01 11:00:00', NULL, 'TRX1002', 12000.00, 'Pending', 2);



CREATE TABLE StudentAssignments(
	stdAssignId INT PRIMARY KEY AUTO_INCREMENT,
	stdAssignName VARCHAR(100),
	stdId INT,
	subjectId INT,
	courseId INT,
	grade DOUBLE DEFAULT 0.0,
	fileName VARCHAR(255),
	status VARCHAR(20) DEFAULT 'pending'
);


INSERT INTO StudentAssignments (stdAssignName, stdId, subjectId, courseId, grade, fileName, status) 
VALUES 
('Assignment 1', 1, 1, 1, 8.5, 'assignment1.pdf', 'graded'),
('Assignment 2', 2, 3, 2, 7.0, 'assignment2.docx', 'submitted');




create table StudyMaterial(
		id int primary key auto_increment,
        fimeName varchar(100),
        subjectId int,
        courseId int,
        facultyId int,
        FOREIGN KEY (subjectId) REFERENCES Subjects(subjectId),
		FOREIGN KEY (courseId) REFERENCES Courses(courseId),
		FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId)
);

INSERT INTO StudyMaterial (fimeName, subjectId, courseId, facultyId) 
VALUES 
('Math Guide.pdf', 1, 1, 1), 
('Economics Handbook.docx', 3, 2, 2);



create table FacultyAttendence(
		attendId int primary key auto_increment,
		attDate DATE,
		facultyId INT,
		status CHAR(1),
		FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId)		
);

INSERT INTO FacultyAttendence (attDate, facultyId, status) 
VALUES 
('2024-01-10', 1, 'P'), 
('2024-01-10', 2, 'P');



CREATE TABLE studentattendance (
    attendId INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each attendance record
    attDate DATE NOT NULL,                    -- Date of the attendance
    courseId INT NOT NULL,                    -- Course ID (foreign key referencing courses table)
    stdId INT NOT NULL,                       -- Student ID (foreign key referencing student table)
    facultyId INT NOT NULL,                   -- Faculty ID (foreign key referencing faculty table)
    attendancePercentage TINYINT NOT NULL,    -- Attendance percentage, ranging from 0 to 100
    FOREIGN KEY (courseId) REFERENCES courses(courseId),  -- Foreign key to the courses table
    FOREIGN KEY (stdId) REFERENCES student(stdId),        -- Foreign key to the student table
    FOREIGN KEY (facultyId) REFERENCES faculty(facultyId) -- Foreign key to the faculty table
);

INSERT INTO studentattendance (attDate, courseId, stdId, facultyId, attendancePercentage)  
VALUES  
('2025-02-01', 1, 1, 1, 90),  
('2025-02-02', 2, 2, 2, 75);





