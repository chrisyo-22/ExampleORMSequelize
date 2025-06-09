const Mock = require("mockjs");

const result = Mock.mock({
    "datas|500-700": [
        {
            "id|+1": 1,
            name: "@cname",
            Birth: "@date",
            "Gender|1-2": true,
            Phone: /[2-9]\d{2}-[2-9]\d{2}-\d{4}/,
            "ClassId|1-16": 0,

        }
    ]
}).datas;

const Student = require("../models/Student");
Student.bulkCreate(result);

