const express = require("express");
const cors = require("cors");
const config = require("config");
const bodyParser = require("body-parser");
const path = require("path");

const facultyRoutes = require("./routes/faculty");
const assignmentRoutes = require("./routes/assignments");
const studyMaterialRoutes = require("./routes/studyMaterial");
const noticeRoutes = require("./routes/notices");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/study-material", studyMaterialRoutes);
app.use("/api/notices", noticeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
