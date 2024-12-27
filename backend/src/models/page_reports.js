const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const PageReports = sequelize.define(
  "PageReports",
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conversion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "page_reports",
    timestamps: true, // Tự động thêm createdAt, updatedAt
    indexes: [
      {
        unique: true,
        fields: ["userId", "date"],
      },
    ],
  }
);

module.exports = PageReports;
