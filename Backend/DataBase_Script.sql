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
	status VARCHAR(20)
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

INSERT INTO Subjects (subjectName, subjectDesc, courseId) VALUES 
('Mathematics', 'Basic Math concepts', 1), 
('Physics', 'Fundamentals of Physics', 1), 
('Chemistry', 'Introduction to Chemistry', 2);


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

INSERT INTO Student (stdName, email, password, courseId, address, photoImageName, birthDate, gender, roleId)
VALUES 
('John Doe', 'john.doe@example.com', 'pass123', 1, '123 Main St', 'john.jpg', '2000-01-01', 'M', 2),
('Jane Smith', 'jane.smith@example.com', 'pass456', 2, '456 Elm St', 'jane.jpg', '1999-05-12', 'F', 2)


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

INSERT INTO Faculty (fname, email, password, courseId, address, photoImageName, birthDate, gender, roleId) VALUES 
('Dr. Alan Brown', 'alan.brown@example.com', 'faculty123', 1, '789 Pine St', 'alan.jpg', '1980-09-15', 'M', 3),
('Prof. Mary Johnson', 'mary.johnson@example.com', 'faculty456', 3, '321 Oak St', 'mary.jpg', '1975-11-23', 'F', 3);


CREATE TABLE Documents
(
    docId INT PRIMARY KEY AUTO_INCREMENT,
    docName VARCHAR(100) NOT NULL,
    docType VARCHAR(100),
    stdId INT,
    FOREIGN KEY (stdId) REFERENCES Student(stdId)
);

INSERT INTO Documents (docName, docType, stdId) VALUES 
('Math Notes', 'PDF', 1), 
('Physics Lab Report', 'Word', 2);


CREATE TABLE Help
(
    helpId INT PRIMARY KEY AUTO_INCREMENT,
    msgTxt VARCHAR(100) NOT NULL,
    stdId INT,
    FOREIGN KEY (stdId) REFERENCES Student(stdId)
);

INSERT INTO Messages (msgTxt, stdId, facultyId, roleId) VALUES 
('Assignment submission delayed', 1, 1, 2),
('Exam schedule updated', 2, 2, 3);


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

INSERT INTO Assignments (assignName, assignDesc, publishDate, dueDate, courseId, subjectId, studentId) VALUES 
('Math Homework 1', 'Complete problems 1-10', '2024-06-10 10:00:00', '2024-06-20', 1, 1, 1),
('Physics Project', 'Group project on motion', '2024-06-12 12:00:00', '2024-06-25', 2, 2, 2);


CREATE TABLE ExamsDetails (
    examId INT PRIMARY KEY AUTO_INCREMENT,
    examName VARCHAR(100) NOT NULL,
	examDate DATETIME,
	subjectId INT,
    courseId INT,
    FOREIGN KEY (courseId) REFERENCES Courses(courseId),
    FOREIGN KEY (subjectId) REFERENCES Courses(subjectId)
);

INSERT INTO ExamsDetails (examName, courseId) VALUES 
('Mid-Term Exam', 1), 
('Final Exam', 2);



CREATE TABLE Notices (
    noticeId INT PRIMARY KEY AUTO_INCREMENT,
    courseId INT,
    noticeText VARCHAR(100),
	facultyId INT,
    roleId INT,
	FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId),
    FOREIGN KEY (roleId) REFERENCES Roles(roleId)
    FOREIGN KEY (courseId) REFERENCES Courses(courseId)
);

INSERT INTO Notices (courseId, noticeText) VALUES 
(1, 'Holiday on 15th August'), 
(2, 'Fee payment deadline extended');



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

INSERT INTO PaymentDetails (initialDate, trnxCompleteDate, trnxNo, amount, status, stdId) VALUES 
('2024-05-01 10:00:00', '2024-05-02 12:00:00', 'TRX12345', 5000.00, 'Completed', 1),
('2024-05-03 11:00:00', '2024-05-04 15:00:00', 'TRX67890', 5500.00, 'Pending', 2);


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


INSERT INTO StudentAssignments (stdAssignName, stdId, subjectId, courseId, grade, fileName, status) VALUES
('Assignment 1', 1, 1, 1, 8.0, 'assignment1.pdf', 'submitted'),
('Assignment 1', 2, 2, 2, 9.0, 'assignment2.docx', 'graded')



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



create table StudentAttendence(
		attendId int primary key auto_increment,
		attDate DATE,
		courseId INT,
		stdId INT,
		facultyId INT,
		status CHAR(1),
		FOREIGN KEY (courseId) REFERENCES Courses(courseId),
		FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId),
		FOREIGN KEY (stdId) REFERENCES Student(stdId)
		
);


create table FacultyAttendence(
		attendId int primary key auto_increment,
		attDate DATE,
		facultyId INT,
		status CHAR(1),
		FOREIGN KEY (facultyId) REFERENCES Faculty(facultyId),		
);





