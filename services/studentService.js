const Student = require("../models/Student");
const { Op } = require("sequelize");
const Class = require("../models/Class");
const validate = require("validate.js");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");


exports.addStudent = async function (studentObj) {
    stuObj = pick(studentObj, "name", "Birth", "Gender", "Phone", "ClassId");
    // console.log(stuObj)
    validate.validators.classExits = async function (value) {
        const c = await Class.findByPk(value);
        if (c) {
            return;
        }
        return "is not exist";
    };

    const rule = {
        //Validate Rules
        name: {
            presence: {
                allowEmpty: false,
            },
            type: "string",
            length: {
                minimum: 1,
                maximum: 10,
            },
        },
        Birth: {
            presence: {
                allowEmpty: false,
            },
            datetime: {
                dateOnly: true,
                earliest: +moment.utc().subtract(100, "y"),
                latest: +moment.utc().subtract(5, "y"),
            },
        },
        Gender: {
            presence: true,
            type: "boolean",
        },
        Phone: {
            presence: {
                allowEmpty: false,
            },
            format: /\d{3}-\d{3}-\d{4}/,
            type: "string",
        },
        ClassId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                strict: false,
            },
            classExits: true,
        },
    };
    await validate.async(stuObj, rule);
    const ins = await Student.create(stuObj);
    return ins.toJSON();
}




exports.deleteStudent = async function (studentId) {
    //Method 1
    //1. get instance
    // const ins = await Admin.findByPk(studentId);
    // //2. delete instance
    // const res = await ins.destroy();

    //Method 2
    return await Student.destroy({
        where: {
            id: studentId
        }
    })
}


exports.updateStudent = async function (id, studentObj) {
    //Method 1: get instance and update
    // const ins = await Admin.findByPk(id);
    // ins.loginId = studentObj.loginId;
    // ins.save();

    //Method 2:
    const res = await Student.update(studentObj, {
        where: {
            id
        }
    })
    // console.log(studentObj);
    return res;

}

exports.getStudents = async function (page = 1, limit = 10) {
    const res = await Student.findAll({
        offset: (page - 1) * limit,//limit ?
        limit: +limit
    });
    const total = await Student.count();
    const datas = JSON.parse(JSON.stringify(res));
    return {
        total,
        datas
    }
}

exports.getStudentsV2 = async function (page = 1, limit = 10, gender = -1, name = "") {
    const condition = {};
    if (gender != -1) {
        condition.gender = !!gender;
    }

    if (name) {
        condition.name = {
            [Op.like]: `%${name}%`
        };
    }
    const res = await Student.findAndCountAll({
        attributes: ["id", "name", "Birth", "Gender"], //limit cols we want, we sometime dont want article
        include: [Class],
        where:
            condition,
        offset: (page - 1) * limit,
        limit: +limit
    });
    return {
        total: res.count,
        datas: JSON.parse(JSON.stringify(res.rows))
    }
}

exports.getStudentById = async function (id) {
    const res = await Student.findByPk(id)
    return JSON.parse(JSON.stringify(res));
}




