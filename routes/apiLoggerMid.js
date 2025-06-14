const { apiLogger } = require("../logger");
const log4js = require("log4js");

//Manual log
// module.exports = (req, res, next) => {
//     next();
//     apiLogger.debug(`${req.method} ${req.path} ${req.ip}`);
// }


//Automatic Log
module.exports = log4js.connectLogger(apiLogger,{
    level: 'auto',
    nolog: `\\.gif\\.jpg$`
})