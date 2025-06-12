const { DataTypes } = require("sequelize");
const sequelize = require('./db');
const moment = require("moment");
const Student = sequelize.define("Student", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Birth: {
        type: DataTypes.DATE,
        allowNull: false,
        get(){
            const birth = this.getDataValue("Birth");
            if(birth){
                return birth.getTime();
            }
            return undefined;
        }

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
    },
    age:{
        type:DataTypes.VIRTUAL,
        get(){
            const now = moment.utc();
            const birth = moment.utc(this.Birth);
            return now.diff(birth, "y");
        }
    }
},
    {
        createdAt: false,
        updatedAt: false,
        paranoid: true,
    })

module.exports = Student;