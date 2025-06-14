const jwt = require("jsonwebtoken");
const cookieKey = "token";
const secret = "chrisyo";


// const decoded = jwt.verify(token, secret);


exports.publish = function (res, maxAge = 3600 * 24, info = {}) {

    const token = jwt.sign(info, secret, {
        expiresIn: maxAge * 1000,
    })
    //Add to cookie
    // res.cookie(cookieKey, token, {
    //     maxAge: maxAge,
    //     path: "/"
    // })

    //Add to header of Authorization
    res.header("authorization", token);
}


exports.verify = function (req) {
    // let token;
    // token = req.cookies[cookieKey];
    // if (!token) {
    //directly find token in Authorization Header
    let token = req.headers.authorization
    if (!token) return null;
    const parts = token.split(" ");
    token = parts.length === 1 ? parts[0] : parts[1]
    // }
    try {
        const result = jwt.verify(token, secret);
        return result;
    }
    catch {
        return null;
    }
}