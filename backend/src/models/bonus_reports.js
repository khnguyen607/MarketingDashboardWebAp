const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BonusReports = sequelize.define('BonusReports', {
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
    tern: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    record: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    documentReference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'bonus_reports',
    timestamps: true, // Tự động thêm createdAt, updatedAt
});

module.exports = BonusReports;
