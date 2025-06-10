module.exports = (req, res, next) => {
    if (req.path.startsWith("/api")) {
        //api gateway
        next();
    }
    else {
        //static resources
        if (true) {
            res.send("Static resources");
        } else {
            next();
        }

    }
}