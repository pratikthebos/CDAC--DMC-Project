const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const connectionDetails = {
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('password'),
    database: config.get('database'),
};



// const storage = multer.diskStorage({




//     destination: (req, file, cb) => {
//       cb(null, "uploads/Student_Photo/");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });
  

// router.post('/registration', upload.single("photoImageName"),(req, res) => {
    
//     const connection = mysql.createConnection(connectionDetails);
//     const photoImageName = req.files ? req.file.filename : null;
   
   
//     const {
//         stdName,
//         email,
//         password,
//         courseId,
//         address,
//         birthDate,
//         gender
//           } = req.body;


         


//     // roleId has hard Coded value . need to change default value in dataBase.
//     const sql = `
//     INSERT INTO student 
//     (stdName, email, password, courseId, address, photoImageName, birthDate, gender, roleId) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 2)`;

//     connection.query(sql, [stdName, email, password, courseId, address, photoImageName, birthDate, gender,2], (error, result) => {
//         if (error) {
//             console.error(error.message);
//             return res.status(500).json({"status" : "error", "message" : 'Something Went Wrong...','errorMessage': error.message});
//         } else {
//             res.status(200).json({"status" : "success", "message" : 'Registration Successfully Completed...'});
//         }
//     });


// });

// login user
//////////////// multer old
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Student_Photo");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// registration
router.post("/registration", upload.single("photoImageName"), (request, response) => {
  const connection = mysql.createConnection(connectionDetails);
  const {stdName,email, password, courseId,address,birthDate, gender } = request.body;
  //const photoImageName = request.file.filename ;  upload image using the react native image picker--  do to
  const photoImageName = "";



  

  const statement = `INSERT INTO Student 
       (stdName, email, password, courseId, address, photoImageName, birthDate, gender, roleId) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

       connection.query(
    statement,
    [stdName, email, password, courseId, address, photoImageName, birthDate, gender,2], (error, result) =>  {
      console.log(stdName);
      

      if (error) return response.status(500).send(error.message);

      response.json({
        status: "success",
        message: "Student added",
      });
    }
  );
});



router.post("/login", (request, response) => {
  
    const { email, password } = request.body;
    const connection = mysql.createConnection(connectionDetails);
    
  
    const statement = `SELECT
        stdId,email, stdName, courseId, address,photoImageName, birthDate 
        FROM Student
        WHERE email =? AND password =?`;
        
        
  
        connection.query(statement, [email, password], (err, users) => {
      if (err) response.send(err.message);
      else {
        if (users.length == 0)
             response.status(404).send("No user found");
        else {
          const { stdId,email, stdName,courseId, address, photoImageName,birthDate } = users[0];
          const secretKey = "institute";
          
          const payload = {
            stdId,
            email,
            stdName,
            courseId,
            address,
            photoImageName,
            birthDate
          }

          const token = jwt.sign(payload,secretKey);
          
  
          response.json({
            status: "success",
            data: {
                stdId,
                email,
                stdName,
                courseId,
                address,
                photoImageName,
                birthDate
            },
            token : token
          });
        }
      }
    });
  });


 
  
  
  
  router.put("/editStudent/:id", upload.single("photoImageName"), (request, response) => {
    const {id} = request.params;
    const connection = mysql.createConnection(connectionDetails);
    const studentId = request.params.stdId;
    const { stdName, email, password, courseId, address, birthDate, gender } = request.body;
    const photoImageName = request.file ? request.file.filename : null;
  
    // Update only provided fields
    const fieldsToUpdate = [];
    const values = [];
  
    if (stdName) {
      fieldsToUpdate.push("stdName = ?");
      values.push(stdName);
    }
    if (email) {
      fieldsToUpdate.push("email = ?");
      values.push(email);
    }
    if (password) {
      fieldsToUpdate.push("password = ?");
      values.push(password);
    }
    if (courseId) {
      fieldsToUpdate.push("courseId = ?");
      values.push(courseId);
    }
    if (address) {
      fieldsToUpdate.push("address = ?");
      values.push(address);
    }
    if (birthDate) {
      fieldsToUpdate.push("birthDate = ?");
      values.push(birthDate);
    }
    if (gender) {
      fieldsToUpdate.push("gender = ?");
      values.push(gender);
    }
    if (photoImageName) {
      fieldsToUpdate.push("photoImageName = ?");
      values.push(photoImageName);
    }
  
    // Ensure there are fields to update
    if (fieldsToUpdate.length === 0) {
      return response.status(400).json({
        status: "error",
        message: "No fields provided for update",
      });
    }
  
    // Add the student ID for the WHERE clause
    values.push(id);
  
    const updateStatement = `UPDATE student SET ${fieldsToUpdate.join(", ")} WHERE stdId = ?`;
  
    connection.query(updateStatement, values, (error, result) => {
      if (error) {
        return response.status(500).json({
          status: "error",
          message: error.message,
        });
      }
  
      if (result.affectedRows === 0) {
        return response.status(404).json({
          status: "error",
          message: "Student not found",
        });
      }
  
      response.json({
        status: "success",
        message: "Student information updated successfully",
      });
    });
  });


// get notifications 
router.get("/notice", (request, response) => {
  const connection = mysql.createConnection(connectionDetails);
  const statement = `select * from notices`;
  connection.execute(statement, (err, rows) => {
    if (err) response.send(err.message);
    else if (rows.length === 0) response.send("no users found");
    else response.json({ status: "success", data: rows });
  });
});






router.get("/attendance", (request, response) => {
  const connection = mysql.createConnection(connectionDetails);
  const { stdId } = request.query;  // Get student ID from query parameter
  
  if (!stdId) return response.status(400).json({ error: 'Student ID required' });

  const query = 'SELECT * FROM studentattendance WHERE stdId = ?';

  
  
  connection.query(query, [stdId], (err, rows) => {
    
    
    
    response.json({ status: 'success', data: rows });
  });

  
});








router.get('/paymentdetails/:stdId', (req, res) => {
  const stdId = req.params.stdId; // Extract student ID from URL
  const sql = 'SELECT * FROM paymentdetails WHERE stdId = ?'; // SQL Query with placeholder

  

  // Create a new connection
  const connection = mysql.createConnection(connectionDetails);

  connection.connect((connectError) => {
      if (connectError) {
          console.error('Database connection error:', connectError.message);
          res.status(500).json({
              status: 'error',
              message: 'Database connection failed',
              errorMessage: connectError.message
          });
          return;
      }
// Query the database
connection.query(sql, [stdId], (queryError, result) => {
  if (queryError) {
      console.error('Database query error:', queryError.message);
      res.status(500).json({
          status: 'error',
          message: 'Something went wrong...',
          errorMessage: queryError.message
      });
  } else if (result.length === 0) {
      res.status(404).json({
          status: 'error',
          message: 'No payment details found for student ID: ${stdId}'
      });
  } else {
      res.status(200).json({
          status: 'success',
          data: result[0]
      });
  }

  // End the connection after query
  connection.end((endError) => {
      if (endError) {
          console.error('Error closing the connection:', endError.message);
      }
  });
});
});
});

//--------------------------------

router.get('/assignments/:studentId', (req, res) => {
  const studentId = req.params.studentId; // Extract student ID from URL

  // SQL query to fetch assignments for the given studentId
  const sql = 'SELECT * FROM assignments WHERE studentId = ?';

  // Create a new connection
  const connection = mysql.createConnection(connectionDetails);

  connection.connect((connectError) => {
      if (connectError) {
          console.error('Database connection error:', connectError.message);
          return res.status(500).json({
              status: 'error',
              message: 'Database connection failed',
              errorMessage: connectError.message
          });
      }

      // Query the database for assignments of the specific studentId
      connection.query(sql, [studentId], (queryError, result) => {
          if (queryError) {
              console.error('Database query error:', queryError.message);
              return res.status(500).json({
                  status: 'error',
                  message: 'Something went wrong...',
                  errorMessage: queryError.message
              });
          }

          // If no assignments are found for the studentId
          if (result.length === 0) {
              return res.status(404).json({
                  status: 'error',
                  message: `No assignments found for student ID: ${studentId}`
              });
          }

          // If assignments are found, return them
          return res.status(200).json({
              status: 'success',
              data: result
          });
      });

      // End the connection after query
      connection.end((endError) => {
          if (endError) {
              console.error('Error closing the connection:', endError.message);
          }
      });
  });
});














  
  

module.exports = router;