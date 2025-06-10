const express = require("express");
const path = require("path");
const http = require("http");
const app = express(); //create an app of express
const port = 9527;
const staticRoot = path.resolve(__dirname, "../public")

// const server = http.createServer(app);
// server.listen(port, () => {
//     console.log("server listen on 9527");
// })

//A better way to create server:
app.listen(port, () => {
    console.log(`server  listen on ${port}`);
});

/**
 * static() method:
 * When request comes in, it try TO send the file based on the URL
 * it will not move to next middleware
 * If not exists, then call next()
 */
app.use(express.static(staticRoot))

//application/x-www-form-urlencoded format body type
app.use(express.urlencoded({ extended: true }));
//application/json format body type
app.use(express.json());

//Above handle body, so that we can access through req.body nicely. Below it handle api call



app.get("/abc", (req, res) => {
    //req and res has been escapsulated.
    console.log(req.headers);
    console.log(req.path);
    console.log(req.query);

    // Send a response so the request doesn't hang
    res.json({
        message: "Hello from /abc endpoint!",
        timestamp: new Date().toISOString()
    });
});



app.get("/news/:id", (req, res) => {
    console.log("params", req.params);
    // res.send("<h1>hello</h1>");
    // res.status(301).header("location", "https://google.ca").end();
    res.status(301).location("https://google.ca").end();
});

//middleware:
app.get("/middleware",
    (req, res, next) => {
        //means pass into next function
        next();
    },
    (req, res) => {

    },
    (req, res) => {

    },

)

//Student Service Router:
app.use("/api/student", require("./api/student"));
app.use("/api/class", require("./api/student"));
app.use("/api/admin", require("./api/student"));
app.use("/api/book", require("./api/student"));

// app.use("/news", require("./errorMiddleware"));
app.use(require("./errorMiddleware"));
