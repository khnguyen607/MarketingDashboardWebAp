const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SaleReports = sequelize.define(
  "SaleReports",
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
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    incomeNew: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    incomeOld: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataNew: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataOld: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderNew: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderOld: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "sale_reports",
    timestamps: true, // Tự động thêm createdAt, updatedAt
    indexes: [
      {
        unique: true,
        fields: ["userId", "date"],
      },
    ],
  }
);

module.exports = SaleReports;
