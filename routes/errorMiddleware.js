const log4js = require("log4js");
const { getErr,getResult } = require("./api/getSendResult");
const multer = require("multer");

module.exports = (err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            // console.log(err);
            res.status(200).send(getErr(err.message));
            return;
        }
        const errObj = err instanceof Error ? err.message : err;
        res.status(500).send(getErr(errObj));
    }
    else {
        next();
    }
}