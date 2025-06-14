const { getErr } = require("./api/getSendResult");
const { pathToRegexp } = require("path-to-regexp");
const cryptor = require("../util/crypt");
const jwt = require("./jwt");

const needTokenApi = [
  { method: "POST", path: "/api/student" },
  { method: "PUT", path: "/api/student/:id" },
  { method: "GET", path: "/api/admin/whoami" }
];

// parsing token
module.exports = (req, res, next) => {
  // /api/student/:id 和  /api/student/1771
  const apis = needTokenApi.filter((api) => {
    const { regexp } = pathToRegexp(api.path);
    return api.method === req.method && regexp.test(req.path);
  });
  if (apis.length === 0) {
    next();
    return;
  }

  const result = jwt.verify(req);
  if (result) {
    //Login success, jwt is valid
    req.userId = result.id;
    next();
  }
  else {
    //jwt is invalid
    handleNonToken(req, res, next);
  }


  // if (req.session.loginUser) {
  //   //already login
  //   next();
  // }
  // else {
  //   handleNonToken(req, res, next);
  // }


  // let token = req.cookies.token;
  // if (!token) {
  //   // get header from authorization
  //   token = req.headers.authorization;
  // }
  // if (!token) {
  //   //No authorization
  //   handleNonToken(req, res, next);
  //   return;
  // }
  // const userId = cryptor.decrypt(token);
  // req.userId = userId;
  // next();
};

//Handle No authorization
function handleNonToken(req, res, next) {
  res
    .status(403)
    .send(getErr("you dont have any token to access the api", 403));
}

