const ejs = require("ejs");

const str = `
generating #: <%= number %> <%= string %>

`;

const result = ejs.render(str, {
    number: Math.random(),
    string: "Hello worold"
})

console.log(result);
