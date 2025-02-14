-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: ims
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `assignId` int NOT NULL AUTO_INCREMENT,
  `assignName` varchar(100) DEFAULT NULL,
  `assignDesc` varchar(100) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  `subjectId` int DEFAULT NULL,
  `studentId` int DEFAULT NULL,
  PRIMARY KEY (`assignId`),
  KEY `courseId` (`courseId`),
  KEY `subjectId` (`subjectId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`),
  CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`),
  CONSTRAINT `assignments_ibfk_3` FOREIGN KEY (`studentId`) REFERENCES `student` (`stdId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,'Assignment 1','Math problems set','2024-01-01 10:00:00','2024-01-10',1,1,1),(2,'Assignment 2','Economics analysis report','2024-01-05 12:00:00','2024-01-15',2,3,2);
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseId` int NOT NULL AUTO_INCREMENT,
  `courseName` varchar(50) NOT NULL,
  `courseDesc` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Active',
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'B.Sc Science','Bachelor of Science Program','Active'),(2,'B.Com','Bachelor of Commerce Program','Active'),(3,'B.Tech','Bachelor of Technology Program','inactive'),(4,'B.E','Bachlore of Engineering','inactive'),(5,'Msc','Master in Science','inactive'),(6,'CDAC','Diploma in Advance Computing','string'),(7,'DMC','Mobile Computing',''),(8,'aj','Ajay',NULL),(9,'Ak','Ajay Kadu','string'),(10,'Ak','Ajay',''),(11,'Ak','Kadu',NULL),(12,'Aj','Ajay Kadu','string'),(13,'string','string','inactive'),(14,'k','Kadu','inactive'),(15,'kk','kevin kumar','string'),(16,'BTECH','Ajay Added this course','string'),(17,'Rahul','addeds','inactive'),(18,'Rohit','Academi','inactive'),(19,'virat','added virat','inactive'),(20,'BTECH','Bachlore of Technology','inactive'),(21,'B.E','Bachlore of Engineering','inactive'),(22,'BTECH','Bachlore','inactive'),(23,'BTECH','Bachlore in Technology','Active');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `docId` int NOT NULL AUTO_INCREMENT,
  `docName` varchar(100) NOT NULL,
  `docType` varchar(100) DEFAULT NULL,
  `stdId` int DEFAULT NULL,
  PRIMARY KEY (`docId`),
  KEY `stdId` (`stdId`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`stdId`) REFERENCES `student` (`stdId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'Math Notes','PDF',1),(2,'Economics Workbook','Excel',2),(3,'Programming Basics','PDF',3);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examsdetails`
--

DROP TABLE IF EXISTS `examsdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examsdetails` (
  `examId` int NOT NULL AUTO_INCREMENT,
  `examName` varchar(100) NOT NULL,
  `examDate` datetime DEFAULT NULL,
  `subjectId` int DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  PRIMARY KEY (`examId`),
  KEY `courseId` (`courseId`),
  KEY `subjectId` (`subjectId`),
  CONSTRAINT `examsdetails_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`),
  CONSTRAINT `examsdetails_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examsdetails`
--

LOCK TABLES `examsdetails` WRITE;
/*!40000 ALTER TABLE `examsdetails` DISABLE KEYS */;
INSERT INTO `examsdetails` VALUES (1,'Mid-Term Mathematics','2024-03-01 09:00:00',1,1),(2,'Final Economics Exam','2024-04-20 11:00:00',3,2);
/*!40000 ALTER TABLE `examsdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `facultyId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `courseId` int DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `photoImageName` varchar(255) NOT NULL DEFAULT 'img.jpg',
  `birthDate` date DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `status` varchar(10) DEFAULT 'active',
  PRIMARY KEY (`facultyId`),
  UNIQUE KEY `email` (`email`),
  KEY `courseId` (`courseId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`),
  CONSTRAINT `faculty_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`rOleId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,'Anjali','Mehta','anjali.mehta@example.com','faculty123',1,'123 MG Road, Delhi','anjali.jpg','1985-03-22','F',3,'inactive'),(2,'Ravi','Singh','ravi.singh@example.com','faculty456',2,'456 Brigade Road, Bangalore','ravi.jpg','1978-08-12','M',3,'inactive'),(3,'Kavita','Iyer','kavita.iyer@example.com','faculty789',3,'789 Residency Road, Mumbai','kavita.jpg','1982-05-05','F',3,'inactive'),(4,'Ajay','Kadu','ajay@gmail.com','Ajay',3,'Akola','img.jpg','2024-12-28','m',1,'active'),(5,'virat','Kohli','virat@gmail.com','Virat',2,'Delhi','img.jpg','2024-12-29','m',2,'active'),(6,'Ayush','Thapa','ayush@gmail.com','Ayush',1,'MP','img-Ayush.jpg','2002-10-12','M',2,'active'),(7,'Sameer','Pawar','sam@gmail.com','Sameer',NULL,'Mumbai','img.jpg','2001-06-15','M',NULL,'active'),(8,'Ajay','Kadu','kaduajay1122@gmail.com','Ajay',NULL,'At. Changalwadi post. Malegaon','img.jpg','2025-01-29','M',NULL,'inactive'),(11,'Rohit','Sharma','rohit@gmail.com','Rohit',NULL,'Mumbai','img.jpg','1980-04-30','M',NULL,'inactive'),(12,'Virat','Kohli','v@gmail.com','V',NULL,'Delhi','img.jpg','1983-11-05','M',NULL,'inactive'),(13,'shreyash','iyer','shreyas@gmail.com','S',NULL,'Mumbai','img.jpg','1995-09-08','M',NULL,'inactive'),(14,'Ravi','Ashwin','ravi@gmail.com','R',1,'Chennai','img.jpg','6198-05-23','M',1,'inactive'),(15,'Swaraj','Kadu','swaraj@gmail.com','Swaraj',1,'Telhara','ind vs eng.jpg','2012-07-31','M',1,'active'),(16,'Shafali','Verma','shafali@gmail.com','Shafali',2,'Gujrat','090f5516b8b09acf34fd4d55517c2e24.jpg','2001-05-07','F',1,'active'),(17,'Jasprit','Bumrah','jasi@gmail.com','Jasprit',1,'Punjab','pixel-8.jpg','1993-11-23','M',1,'active'),(18,'Shubhman','Gill','gill@gmail.com','Gill',1,'Ludhiyana','Dmc.png','2002-02-02','M',1,'active');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultyattendence`
--

DROP TABLE IF EXISTS `facultyattendence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facultyattendence` (
  `attendId` int NOT NULL AUTO_INCREMENT,
  `attDate` date DEFAULT NULL,
  `facultyId` int DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`attendId`),
  KEY `facultyId` (`facultyId`),
  CONSTRAINT `facultyattendence_ibfk_1` FOREIGN KEY (`facultyId`) REFERENCES `faculty` (`facultyId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultyattendence`
--

LOCK TABLES `facultyattendence` WRITE;
/*!40000 ALTER TABLE `facultyattendence` DISABLE KEYS */;
INSERT INTO `facultyattendence` VALUES (1,'2024-01-10',1,'P'),(2,'2024-01-10',2,'P');
/*!40000 ALTER TABLE `facultyattendence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `help`
--

DROP TABLE IF EXISTS `help`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help` (
  `helpId` int NOT NULL AUTO_INCREMENT,
  `msgTxt` varchar(100) NOT NULL,
  `stdId` int DEFAULT NULL,
  PRIMARY KEY (`helpId`),
  KEY `stdId` (`stdId`),
  CONSTRAINT `help_ibfk_1` FOREIGN KEY (`stdId`) REFERENCES `student` (`stdId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help`
--

LOCK TABLES `help` WRITE;
/*!40000 ALTER TABLE `help` DISABLE KEYS */;
INSERT INTO `help` VALUES (1,'Unable to access assignments.',1),(2,'Payment status not updated.',2);
/*!40000 ALTER TABLE `help` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notices`
--

DROP TABLE IF EXISTS `notices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notices` (
  `noticeId` int NOT NULL AUTO_INCREMENT,
  `courseId` int DEFAULT NULL,
  `noticeText` varchar(100) DEFAULT NULL,
  `facultyId` int DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`noticeId`),
  KEY `facultyId` (`facultyId`),
  KEY `roleId` (`roleId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `notices_ibfk_1` FOREIGN KEY (`facultyId`) REFERENCES `faculty` (`facultyId`),
  CONSTRAINT `notices_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`rOleId`),
  CONSTRAINT `notices_ibfk_3` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notices`
--

LOCK TABLES `notices` WRITE;
/*!40000 ALTER TABLE `notices` DISABLE KEYS */;
INSERT INTO `notices` VALUES (1,1,'Mid-term exams scheduled for March.',1,3),(2,2,'Economics workshop on 15th Jan.',2,3);
/*!40000 ALTER TABLE `notices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentdetails`
--

DROP TABLE IF EXISTS `paymentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentdetails` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `initialDate` datetime DEFAULT NULL,
  `trnxCompleteDate` datetime DEFAULT NULL,
  `trnxNo` varchar(100) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `stdId` int DEFAULT NULL,
  PRIMARY KEY (`paymentId`),
  KEY `stdId` (`stdId`),
  CONSTRAINT `paymentdetails_ibfk_1` FOREIGN KEY (`stdId`) REFERENCES `student` (`stdId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentdetails`
--

LOCK TABLES `paymentdetails` WRITE;
/*!40000 ALTER TABLE `paymentdetails` DISABLE KEYS */;
INSERT INTO `paymentdetails` VALUES (1,'2024-01-01 10:00:00','2024-01-02 12:00:00','TRX1001',10000,'Completed',1),(2,'2024-02-01 11:00:00',NULL,'TRX1002',12000,'Pending',2);
/*!40000 ALTER TABLE `paymentdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `rOleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(10) NOT NULL,
  PRIMARY KEY (`rOleId`),
  UNIQUE KEY `roleName` (`roleName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(3,'Faculty'),(2,'Student');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `stdId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `courseId` int DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `photoImageName` varchar(100) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Active',
  PRIMARY KEY (`stdId`),
  UNIQUE KEY `email` (`email`),
  KEY `courseId` (`courseId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`),
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`rOleId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Rajesh','Kumar','rajesh.kumar@example.com','pass123',1,'123 MG Road, Delhi','rajesh.jpg','2000-02-15','M',2,'Active'),(2,'Priya','Sharma','priya.sharma@example.com','pass456',2,'456 Brigade Road, Bangalore','priya.jpg','1999-06-20','F',2,'inactive'),(3,'Aditya','Verma','aditya.verma@example.com','pass789',3,'789 Residency Road, Mumbai','aditya.jpg','2001-11-10','M',2,'inactive'),(4,'Jatin','Jain','j@gmail.com','123',2,'Bhopal','string','2024-12-28','m',2,'inactive'),(5,'rishabh','pant','rishabh@gmail.com','Rishabh',3,'Dehradun','rishu','2024-12-28','m',2,'inactive'),(6,'Nitish','Reddey','nitish@gmail.com','Nitish',2,'Hydrabad','nitish-img','2024-12-28','m',2,'inactive'),(7,'Ajay','Kadu','ajay@gmail.com','Ajay',1,'Akola','string','2025-02-12','M',2,'inactive'),(8,'Jatin','Jain','jatin@gmail.com','Jatin',NULL,'Indore',NULL,'2003-12-12','M',2,'inactive'),(9,'Ayush','Thapa','a@gmail.com','A',NULL,'MP',NULL,'2025-02-11','M',2,'inactive'),(10,'Ajay','Kadu','kaduajay1122@gmail.com','A',1,'At. Changalwadi post. Malegaon',NULL,'2001-09-26','M',2,'inactive');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentassignments`
--

DROP TABLE IF EXISTS `studentassignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentassignments` (
  `stdAssignId` int NOT NULL AUTO_INCREMENT,
  `stdAssignName` varchar(100) DEFAULT NULL,
  `stdId` int DEFAULT NULL,
  `subjectId` int DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  `grade` double DEFAULT '0',
  `fileName` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  PRIMARY KEY (`stdAssignId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentassignments`
--

LOCK TABLES `studentassignments` WRITE;
/*!40000 ALTER TABLE `studentassignments` DISABLE KEYS */;
INSERT INTO `studentassignments` VALUES (1,'Assignment 1',1,1,1,8.5,'assignment1.pdf','graded'),(2,'Assignment 2',2,3,2,7,'assignment2.docx','submitted');
/*!40000 ALTER TABLE `studentassignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentattendence`
--

DROP TABLE IF EXISTS `studentattendence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentattendence` (
  `attendId` int NOT NULL AUTO_INCREMENT,
  `attDate` date DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  `stdId` int DEFAULT NULL,
  `facultyId` int DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`attendId`),
  KEY `courseId` (`courseId`),
  KEY `facultyId` (`facultyId`),
  KEY `stdId` (`stdId`),
  CONSTRAINT `studentattendence_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`),
  CONSTRAINT `studentattendence_ibfk_2` FOREIGN KEY (`facultyId`) REFERENCES `faculty` (`facultyId`),
  CONSTRAINT `studentattendence_ibfk_3` FOREIGN KEY (`stdId`) REFERENCES `student` (`stdId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentattendence`
--

LOCK TABLES `studentattendence` WRITE;
/*!40000 ALTER TABLE `studentattendence` DISABLE KEYS */;
INSERT INTO `studentattendence` VALUES (1,'2024-01-10',1,1,1,'P'),(2,'2024-01-10',2,2,2,'A');
/*!40000 ALTER TABLE `studentattendence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studymaterial`
--

DROP TABLE IF EXISTS `studymaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studymaterial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fimeName` varchar(100) DEFAULT NULL,
  `subjectId` int DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  `facultyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subjectId` (`subjectId`),
  KEY `courseId` (`courseId`),
  KEY `facultyId` (`facultyId`),
  CONSTRAINT `studymaterial_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`subjectId`),
  CONSTRAINT `studymaterial_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`),
  CONSTRAINT `studymaterial_ibfk_3` FOREIGN KEY (`facultyId`) REFERENCES `faculty` (`facultyId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studymaterial`
--

LOCK TABLES `studymaterial` WRITE;
/*!40000 ALTER TABLE `studymaterial` DISABLE KEYS */;
INSERT INTO `studymaterial` VALUES (1,'Math Guide.pdf',1,1,1),(2,'Economics Handbook.docx',3,2,2);
/*!40000 ALTER TABLE `studymaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subjectId` int NOT NULL AUTO_INCREMENT,
  `subjectName` varchar(20) NOT NULL,
  `subjectDesc` varchar(100) DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  PRIMARY KEY (`subjectId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'Mathematics','Advanced Mathematics',1),(2,'Physics','Introduction to Physics',1),(3,'Economics','Basic Economics',2),(4,'Computer Science','Introduction to Programming',3);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-14 17:44:52
