const qs = require("querystring");

module.exports = (req, res, next) => {
    // console.log(req.headers["content-type"]);
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        let result = "";
        req.on("data", (chunk) => {
            result += chunk.toString("utf-8");

        });
        req.on("end", () => {
            // console.log(result);
            const query = qs.parse(result);
            req.body = query;
            next();
        });
    }
    else {
        next();
    }

}