const log4js = require("log4js");
const { getErr } = require("./api/getSendResult")
module.exports = (err, req, res, next) => {
    if (err) {
        const errObj = err instanceof Error ? err.message : err;
        res.status(500).send(getErr(errObj));
    }
    else {
        next();
    }
}