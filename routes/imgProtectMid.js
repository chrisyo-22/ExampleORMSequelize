const url = require("url");
const path = require("path");

module.exports = (req, res, next) => {
    const host = req.headers.host; //get this host's name and port
    let referer = req.headers.referer;
    //only images
    const extname = path.extname(req.path);
    if(![".jpg", ".jpeg", ".png", ".gif"].includes(extname)){
        next();
        return;
    }
    if (referer) {
        referer = url.parse(referer).host;

    }
    if (referer && host !== referer) {
        res.status(404).end();
        //replace as an image:
        //req.url = "/img/logo.jpg" //url rewrite
        return;
    }

    next();
}

