const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const IncomeReports = sequelize.define(
  "IncomeReports",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adsRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tern: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    income: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "income_reports",
    timestamps: true, // Tự động thêm createdAt, updatedAt
    indexes: [
      {
        unique: true,
        fields: ["userId", "tern"],
      },
    ],
  }
);

module.exports = IncomeReports;
