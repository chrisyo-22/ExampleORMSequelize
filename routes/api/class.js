const express = require("express");
const classRouter = express.Router();
const classServ = require("../../services/classService");
const { asyncHandler } = require("../api/getSendResult");

//Get all classes
classRouter.get("/", asyncHandler(async (req, res) => {
    return await classServ.getClasses();
}));

//Add a new class
classRouter.post("/", asyncHandler(async (req, res) => {
    return await classServ.addClass(req.body);
}));

//Get class info by id
classRouter.get("/:id", asyncHandler(async (req, res) => {
    const classId = req.params.id;
    return await classServ.getClassById(classId);
}));

//Delete a class by id
classRouter.delete("/:id", asyncHandler(async (req, res) => {
    const classId = req.params.id;
    await classServ.deleteClass(classId);
    return { message: "Class deleted successfully" };
}));

//Update a class by id
classRouter.put("/:id", asyncHandler(async (req, res) => {
    const classId = req.params.id;
    await classServ.updateClass(classId, req.body);
    return { message: "Class updated successfully" };
}));

module.exports = classRouter;
