const Admin = require("../models/Admin")
const md5 = require("md5");
exports.addAdmin = async function (adminObj) {
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
}

exports.deleteAdmin = async function (adminId) {
    //Method 1
    //1. get instance
    // const ins = await Admin.findByPk(adminId);
    // //2. delete instance
    // const res = await ins.destroy();

    //Method 2
    await Admin.destroy({
        where: {
            id: adminId
        }
    })
}

exports.updateAdmin = async function (id, adminObj) {
    //Method 1: get instance and update
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // ins.save();

    if (adminObj.loginPwd) {
        adminObj.loginPwd = md5(adminObj.loginPwd);
    }
    //Method 2:
    const res = await Admin.update(adminObj, {
        where: {
            id
        }
    })
}

exports.login = async function (loginId, loginPwd) {
    loginPwd = md5(loginPwd)
    const result = await Admin.findOne({
      where: {
        loginId,
        loginPwd,
      },
    });
    if (result && result.loginId === loginId) {
      return result.toJSON();
    }
    return null;
  };

exports.getAdminById = async function (adminId) {
    const res = await Admin.findByPk(adminId);
    if (res) return res.toJSON();
    return null;
}

