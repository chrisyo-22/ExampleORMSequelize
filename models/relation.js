// Set relation for models

const Class = require("./Class");
const Student = require("./Student");

Class.hasMany(Student);
Student.belongsTo(Class);