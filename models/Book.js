const { DataTypes } = require("sequelize");

const sequelize = require('./db');
const Book = sequelize.define("Book", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgurl: {
        type: DataTypes.STRING,
        // allowNull: true,
    },
    publishDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},
    {
        paranoid: true,
    })

module.exports = Book;