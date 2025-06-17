const express = require("express");
const studentRouter = express.Router();
const stuServ = require("../../services/studentService");

studentRouter.get("/", async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const gender = req.query.sex || -1;
    const name = req.query.name || "";
    const result = await stuServ.getStudentsV2(page, limit, gender, name)
    res.render("student.ejs", {
        ...result,
        page,
        limit,
    });

});

module.exports = studentRouter;
