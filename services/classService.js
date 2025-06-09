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
    //Method 1: get instance and update
    // const ins = await Admin.findByPk(id);
    // ins.loginId = studentObj.loginId;
    // ins.save();

    //Method 2:
    const res = await Class.update(classObj, {
        where: {
            id
        }
    })

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