/**
 * Using bcrypt instead of MD5, MD5 is not CR. 
 * Salt → ensures identical passwords yield different hashes.

    Hash (one-way) → cannot be reversed to recover the password.

    Cost → increases the time (and CPU effort) needed to compute each hash.
 */



//require("./models/Sync");
require("./models/relation");
// require("./mock/mockStudent");
// require("./mock/mockClass");
// require("./spider/fetchBooks");


// const Admin = require("./models/Admin");

// const ins = Admin.build({
//     loginId: "abc",
//     loginPwd: "123",
//     name: "Chris"
// });//sync method, construct a instance

// ins.save().then(()=>{
//     console.log("Create success");
// })

//You can also use create(), it's build+save operation


const adminSer = require("./services/adminService");
adminSer.login("abc", "123").then((res) => {
    // console.log(res);
});

adminSer.getAdminById(1).then((res) => {
    // console.log(res);
})



const studentSer = require("./services/studentService");
// studentSer.getStudentsV2(1, 10, false, "蔡").then((res)=>{
//     console.log(res)
// })

const bookSer = require("./services/bookService");
// bookSer.getBooksByPage(1, 10).then((res) => {
//     console.log(res);
// })

// bookSer.getBookById(1).then((res) => {
//     console.log(res);
// })


const classSer = require("./services/classService");
// classSer.getClasses().then((res) => {
//     console.log(res);
// })

//property: hash encryption method. fixed length encryption.(BROKEN)

adminSer.addAdmin(
    {
        loginId: "joelle",
        loginPwd: "123456",
        name: "Joelle"
    }
).then(() => {
    console.log("added")
})



