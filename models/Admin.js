const sequelize = require('./db');
const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
    'Admin',
    {
        // Model attributes are defined here
        loginId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginPwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        // Other model options go here
        createdAt: false,
        updatedAt: false,
        // deletedAt: "aaa",
        paranoid: true, //After this, data will never be truely deleted, only add a column deletedAt(timestamp)
    },
);


module.exports = Admin;