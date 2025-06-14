const express = require("express");
const router = express.Router();
const adminServ = require("../../services/adminService");
const { asyncHandler } = require("./getSendResult");
// const cryptor = require("../../util/crypt");
const { publish } = require("../jwt");
const jwt = require("jsonwebtoken");
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
    if (result) {
      let value = result.id;
      // value = cryptor.encrypt(value.toString());
      //Login success:
      publish(res, undefined, { id: value });



      // req.session.loginUser = result;

      // // Set cookie for browser-based auth
      // res.cookie("token", value, {
      //   path: "/",
      //   domain: "localhost",
      //   maxAge: 7 * 24 * 3600 * 1000, // 7 days in milliseconds
      // });

      // // Set header for API-based auth
      // res.header("authorization", value);
    }
    return result;
  })
);

router.get("/whoami", asyncHandler(async (req, res) => {
  const result = await adminServ.getAdminById(req.userId)
  // console.log(result);
  return result;
}))

module.exports = router;

