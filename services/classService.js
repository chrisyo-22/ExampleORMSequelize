const Class = require("../models/Class");

exports.addClass = async function (classObj) {
    const ins = await Class.create(classObj);
    return ins.toJSON();
}

exports.deleteClass = async function (classId) {
    //Method 1
    //1. get instance
    // const ins = await Admin.findByPk(classId);
    // //2. delete instance
    // const res = await ins.destroy();

    //Method 2
    await Class.destroy({
        where: {
            id: classId
        }
    })
}


exports.updateClass = async function (id, classObj) {
    // First check if class exists
    const classInstance = await Class.findByPk(id);
    if (!classInstance) {
        throw new Error("Class not found");
    }

    // Update the class
    await Class.update(classObj, {
        where: {
            id
        }
    });

    // Return the updated class data
    const updatedClass = await Class.findByPk(id);
    return JSON.parse(JSON.stringify(updatedClass));
}


exports.getClasses = async function () {
    const res = await Class.findAll();
    const total = await Class.count();
    const datas = JSON.parse(JSON.stringify(res));
    return {
        total,
        datas
    }
}

exports.getClassById = async function (classId) {
    const res = await Class.findByPk(classId);
    return JSON.parse(JSON.stringify(res));
}