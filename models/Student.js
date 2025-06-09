const { DataTypes } = require("sequelize");
const sequelize = require('./db');
const Student = sequelize.define("Student", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Birth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Phone: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    ClassId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        createdAt: false,
        updatedAt: false,
        paranoid: true,
    })

module.exports = Student;