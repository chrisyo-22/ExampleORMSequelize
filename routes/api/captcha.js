const express = require("express");
const router = express.Router();
const svgCaptcha = require('svg-captcha');

router.get("/captcha", (req, res, next) => {
    const captcha = svgCaptcha.create({
        size: 6,
        ignoreChars: "i I, l, 1, 0, o, O",
        noise: 6,
        background: (200, 199, 29)
    });
    req.session.captcha = captcha.text.toLowerCase(); //store the captcha text into session for future comparison
    // console.log(req.session.captcha);
    res.type('svg');
    res.status(200).send(captcha.data); //send svg to client
});

function captchaHandler(req, res, next) {
    if (!req.session.records) { //if there is not record in session record, add it
        req.session.records = [];
    }
    const now = new Date().getTime();
    req.session.records.push(now);

    //when in a short amount of time, the request is lot, check for botting
    const duration = 10000;
    const repeat = 3;

    req.session.records = req.session.records.filter(
        (time) =>
            now - time <= duration
    )
    if (req.session.records.length >= repeat || "captcha" in req.body) {
        //within the time limit, there are greater request
        //put captcha
        validateCaptcha(req,res, next);
    } else {
        next();
    }


}


function validateCaptcha(req, res, next) {
    const reqCaptcha = req.body.captcha ? req.body.captcha.toLowerCase() : "";
    if (reqCaptcha !== req.session.captcha) {
        res.send({
            code: 401,
            msg: "Captcha Incorrect!"
        });
    }
    else {
        next();
    }
    //Must reset! Dont reuse same captcha
    req.session.captcha = "";
}

router.post("/*any", captchaHandler);
router.put("/*any", captchaHandler);

module.exports = router;