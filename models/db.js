const { Sequelize } = require('sequelize');
const { sqlLogger } = require("../logger");

const sequelize = new Sequelize('school', 'root', 'chris', {
    host: 'localhost',
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging: (msg) => {
        sqlLogger.debug(msg);
    },
});


module.exports = sequelize;