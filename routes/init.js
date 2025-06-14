const express = require("express");
const path = require("path");
const http = require("http");
const app = express(); //create an app of express
const port = 9527;
const cors = require("cors");

const history = require('connect-history-api-fallback');
app.use(history());
//use session
// const session = require("express-session");
// app.use(session({
//     name:"session-id",
//     secret:"hello chris",
//     cookie:{
//     },
// }));

const staticRoot = path.resolve(__dirname, "../public")

/**
 * static() method:
 * When request comes in, it try TO send the file based on the URL
 * it will not move to next middleware
 * If not exists, then call next()
 */
app.use(express.static(staticRoot))

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


const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(require("./tokenMiddleware"));
//application/x-www-form-urlencoded format body type
app.use(express.urlencoded({ extended: true }));
//application/json format body type
app.use(express.json());

app.use(require("./apiLoggerMid"));

//Above handle body, so that we can access through req.body nicely. Below it handle api call


//Student Service Router:
app.use("/api/student", require("./api/student"));
app.use("/api/class", require("./api/class"));
app.use("/api/admin", require("./api/admin"));
app.use("/api/book", require("./api/book"));
app.use("/api/upload", require("./api/upload"));

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