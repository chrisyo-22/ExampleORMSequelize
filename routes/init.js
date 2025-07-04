const express = require("express");
const path = require("path");
const http = require("http");
const app = express(); //create an app of express
const port = 9527;
const cors = require("cors");

app.use(require("./imgProtectMid"));


// template rendering(MVC, the old way):
app.set("views", path.resolve(__dirname, "./views"));
app.use("/student", require("./controller/student"));



//use sessio
const session = require("express-session");
app.use(session({
  secret: 'keyboard cat',
  // resave: false,
  // saveUninitialized: true,
  // cookie: { secure: true }
}))
//application/x-www-form-urlencoded format body type
app.use(express.urlencoded({ extended: true }));
//application/json format body type
app.use(express.json());
//captcha:
app.use(require("./api/captcha"));

const history = require('connect-history-api-fallback');
app.use(history());


const staticRoot = path.resolve(__dirname, "../public");

/**
 * static() method:
 * When request comes in, it try TO send the file based on the URL
 * it will not move to next middleware
 * If not exists, then call next()
 */
app.use(express.static(staticRoot));

//using cors:
const whiteList = ["null", "http://localhost:9527"];
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, "*");
        return;
      }
      return callback(null, origin);
      // if (whiteList.includes(origin)) {
      //   callback(null, origin);
      // } else {
      //   callback(new Error("not allowed"));
      // }
    },
    credentials: true,
  })
);




app.use(require("./proxyMid"));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(require("./tokenMiddleware"));


app.use(require("./apiLoggerMid"));



//Above handle body, so that we can access through req.body nicely. Below it handle api call

//Student Service Router:
app.use("/api/student", require("./api/student"));
app.use("/api/class", require("./api/class"));
app.use("/api/admin", require("./api/admin"));
app.use("/api/book", require("./api/book"));
app.use("/api/upload", require("./api/upload"));
app.use("/res", require("./api/download"));
// app.use("/news", require("./errorMiddleware"));
app.use(require("./errorMiddleware"));


// const server = http.createServer(app);
// server.listen(port, () => {
//     console.log("server listen on 9527");
// })

//A better way to create server:
app.listen(port, () => {
  console.log(`server  listen on ${port}`);
});