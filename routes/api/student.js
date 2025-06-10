const express = require("express");
const studentRouter = express.Router();
const stuServ = require("../../services/studentService");
const { asyncHandler } = require("../api/getSendResult");

//Search a set of students
studentRouter.get("/", asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const gender = req.query.sex || -1;
    const name = req.query.name || "";
    return await stuServ.getStudentsV2(page, limit, gender, name)
    // res.send(getResult(studentList))
    // res.send(studentList);
}))

//add a student
studentRouter.post("/", asyncHandler(async (req, res, next) => {
    return await stuServ.addStudent(req.body);
}));

//get student info by id
studentRouter.get("/:id", asyncHandler(async (req, res) => {
    const stuId = req.params.id;
    return await stuServ.getStudentById(stuId)

}))

//delete a student by id
studentRouter.delete("/:id", asyncHandler(async (req, res) => {
    const stuId = req.params.id;
    return await stuServ.deleteStudent(stuId);
}));

//modify a student by id
studentRouter.put("/:id", asyncHandler(async (req, res) => {
    const stuId = req.params.id;
    return await stuServ.updateStudent(stuId, req.body);
}));

module.exports = studentRouter;