// starts with /data/api/xxx ---> https://some_backend_server/ports/api/xxxxx

const { createProxyMiddleware } = require("http-proxy-middleware");
const context = "/data";
module.exports = createProxyMiddleware({
    pathFilter: context,
    target: "http://localhost:9527",
    pathRewrite: function (path, req) {
        console.log(path.substr(context.length))
        return path.substr(context.length);
        
    }
},
);

//Now We just need to replace these with http-proxy-middleware
// const http = require("http");

// module.exports = (req, res, next) => {
//     const context = "/data";
//     if (!req.path.startsWith(context)) {
//         //No need to proxy
//         next();
//         return;
//     }
//     //need to proxy
//     const path = req.path.substr(context.length);
//     //create an instance of request object
//     const request = http.request({
//         host: "localhost",
//         port: 9528,
//         method: req.method,
//         headers: req.headers,
//         path: path,

//     }, response => {
//         //proxy response object
//         res.status(response.statusCode);
//         for (const key in response.headers) {
//             res.setHeader("key", response.headers[key]);
//         }
//         response.pipe(res);
//     });
//     req.pipe(request); //copy the body into proxy request's body

// }