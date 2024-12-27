const User = require("../models/users");
const Team = require("../models/teams");
const Branch = require("../models/branches");
const BonusReport = require("../models/bonus_reports");
const IncomeReport = require("../models/income_reports");
const MarketingReport = require("../models/marketing_reports");
const MonthReport = require("../models/month_reports");
const SaleReport = require("../models/sale_reports");
const SaleTargetReport = require("../models/sale_target_reports");
const PageReport = require("../models/page_reports");

// Thiết lập quan hệ giữa User và Team
User.belongsTo(Team, {
  foreignKey: "teamId",
  onDelete: "SET NULL",
});
Team.hasMany(User, { foreignKey: "teamId" });

// Thiết lập quan hệ giữa User và Branch
User.belongsTo(Branch, {
  foreignKey: "branchId",
  onDelete: "SET NULL",
});
Branch.hasMany(User, { foreignKey: "branchId" });

SaleReport.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
User.hasMany(SaleReport, { foreignKey: "userId" });
SaleReport.belongsTo(Team, {
  foreignKey: "teamId",
  onDelete: "SET NULL",
});
Team.hasMany(SaleReport, { foreignKey: "teamId" });
SaleReport.belongsTo(Branch, {
  foreignKey: "branchId",
  onDelete: "SET NULL",
});
Branch.hasMany(SaleReport, { foreignKey: "branchId" });

IncomeReport.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
User.hasMany(IncomeReport, { foreignKey: "userId" });
IncomeReport.belongsTo(Team, {
  foreignKey: "teamId",
  onDelete: "SET NULL",
});
Team.hasMany(IncomeReport, { foreignKey: "teamId" });
IncomeReport.belongsTo(Branch, {
  foreignKey: "branchId",
  onDelete: "SET NULL",
});
Branch.hasMany(IncomeReport, { foreignKey: "branchId" });

SaleTargetReport.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
User.hasMany(SaleTargetReport, { foreignKey: "userId" });
SaleTargetReport.belongsTo(Team, {
  foreignKey: "teamId",
  onDelete: "SET NULL",
});
Team.hasMany(SaleTargetReport, { foreignKey: "teamId" });
SaleTargetReport.belongsTo(Branch, {
  foreignKey: "branchId",
  onDelete: "SET NULL",
});
Branch.hasMany(SaleTargetReport, { foreignKey: "branchId" });

PageReport.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
User.hasMany(PageReport, { foreignKey: "userId" });
PageReport.belongsTo(Team, {
  foreignKey: "teamId",
  onDelete: "SET NULL",
});
Team.hasMany(PageReport, { foreignKey: "teamId" });
PageReport.belongsTo(Branch, {
  foreignKey: "branchId",
  onDelete: "SET NULL",
});
Branch.hasMany(PageReport, { foreignKey: "branchId" });

module.exports = {
  User,
  Team,
  Branch,
  BonusReport,
  IncomeReport,
  MarketingReport,
  MonthReport,
  SaleReport,
  SaleTargetReport,
  PageReport,
};
