const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SaleTargetReports = sequelize.define(
  "SaleTargetReports",
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
    tern: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    incomeTarget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    incomeAvg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "sale_target_reports",
    timestamps: true, // Tự động thêm createdAt, updatedAt
    indexes: [
      {
        unique: true,
        fields: ["userId", "tern"],
      },
    ],
  }
);

module.exports = SaleTargetReports;
