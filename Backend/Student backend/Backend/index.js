const express = require('express');
const config = require('config');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());

var port = config.get('port');

const facultRoutes = require("./routes/faculty");
const studentRoutes = require("./routes/student");

app.listen(port, () => { console.log(`Server Started on port ${port}...`);})

console.log("request comming....")
//app.use('/uploads/Student_Photo', express.static(path.join(__dirname, 'uploads/Student_Photo')));
app.use('/files', express.static(path.join(__dirname, 'uploads')));

app.get('/download/:fileName', (req, res) => {
    const { fileName } = req.params;
    
    // Use path.join to ensure proper handling of the file path
    const filePath = path.join(__dirname, 'uploads', fileName);
  
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Error while downloading:', err);
        res.status(500).send('Error while downloading the file');
      }
    });
  });

app.use("/faculty", facultRoutes);
app.use("/student",studentRoutes);