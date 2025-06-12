const express = require("express");
const router = express.Router();
const adminServ = require("../../services/adminService");
const { asyncHandler } = require("./getSendResult");
const cryptor = require("../../util/crypt");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
    console.log(result);
    if (result) {
      let value = result.id;
      value = cryptor.encrypt(value.toString());
      //登录成功
      req.session.loginUser = result;
      
      // Set cookie for browser-based auth
      res.cookie("token", value, {
        path: "/",
        domain: "localhost",
        maxAge: 7 * 24 * 3600 * 1000, // 7 days in milliseconds
      });
      
      // Set header for API-based auth
      res.header("authorization", value);
    }
    return result;
  })
);

module.exports = router;

