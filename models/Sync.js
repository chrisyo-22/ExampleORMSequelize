require("./Book");
require("./Admin");
require("./Class");
require("./Student");

const sequelize = require('./db');
sequelize.sync({
    alter: true
}).then(() => {
    console.log("Sync Complete")
})