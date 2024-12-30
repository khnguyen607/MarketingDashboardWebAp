const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const branchRoutes = require("./routes/branchRoutes");
const positionRoutes = require("./routes/positionRoutes");
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");
const bonusReportRoutes = require("./routes/bonusReportRoutes");
const incomeReportRoutes = require("./routes/incomeReportRoutes");
const marketingReportRoutes = require("./routes/marketingReportRoutes");
const marketingTargetReportRoutes = require("./routes/marketingTargetReportRoutes");
const saleReportRoutes = require("./routes/saleReportRoutes");
const getReportRoutes = require("./routes/getReportRoutes");
const saleTargetReportRoutes = require("./routes/saleTargetReportRoutes");
const pageReportRoutes = require("./routes/pageReportRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/branches", branchRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bonusReports", bonusReportRoutes);
app.use("/api/incomeReports", incomeReportRoutes);
app.use("/api/marketingReports", marketingReportRoutes);
app.use("/api/marketingTargetReports", marketingTargetReportRoutes);
app.use("/api/saleReports", saleReportRoutes);
app.use("/api/getReports", getReportRoutes); 
app.use("/api/saleTargetReports", saleTargetReportRoutes);
app.use("/api/pageReports", pageReportRoutes);

module.exports = app;
