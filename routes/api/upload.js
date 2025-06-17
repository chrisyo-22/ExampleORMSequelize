const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// const upload = multer({
//     dest:path.resolve(__dirname, "../../public", "upload"),

// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public", "upload"))
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //   cb(null, file.fieldname + '-' + uniqueSuffix)
        //Timestams + 6 Random # + suffix of file extension
        const timestamps = Date.now();
        const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        const filename = `${timestamps}-${randomStr}${ext}`;
        cb(null, filename);
    }
})

const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 500 * 1024,
        },
        fileFilter(req, file, cb){
            //check file extension
            const extname = path.extname(file.originalname);
            const whitelist = ['.jpg', '.gif', '.png'];
            if(whitelist.includes(extname)){
                cb(null, true);
            }
            else{
                cb(new Error(`You et name of ${extname} is not supported`))
            }
        }
    },

)

router.post("/", upload.single("img"), (req, res, next) => {
    //after upload middleware, we will get req.file inside req.
    const url = `/upload/${req.file.filename}`;
    res.send({
        code: 0,
        msg: "",
        data: url
    });
});





module.exports = router;