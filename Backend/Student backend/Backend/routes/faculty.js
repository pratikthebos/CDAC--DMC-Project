const express = require('express');
const mysql = require('mysql2');
const config = require('config');
const router = express.Router();

const connectionDetails = {
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('password'),
    database: config.get('database'),
};

router.post('/registration', (req, res) => {
    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const {
        facultyId,
        fname,
        email,
        password,
        courseId,
        address,
        photoImageName,
        birthDate,
        gender,
        roleId
    } = req.body;

    const sql = `
    INSERT INTO faculty 
    (facultyId, fname, email, password, courseId, address, photoImageName, birthDate, gender, roleId) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [facultyId, fname, email, password, courseId, address, photoImageName, birthDate, gender, roleId], (error, result) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({"status" : "error", "message" : 'Something Went Wrong...','errorMessage': error.message});
        } else {
            res.status(200).json({"status" : "success", "message" : 'Registration Successfully Completed...'});
        }
    });

    connection.end();
});

router.get('/', (req, res) => {
     
    var connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const sql = `select * from faculty`;

    connection.query(sql,(error,result) =>{

        if(error){
            console.log(error.message);
            res.status(500).json({"status" : "error", "message" : 'Something Went Wrong...', 'errorMessage': error.message});
        }
        else{
            res.status(200).json({'status' : 'success', 'data' : result});
        }
    });


    connection.end();

})


module.exports = router;
