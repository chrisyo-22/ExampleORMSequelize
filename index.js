// const moment = require("moment");
// moment.locale("zh-cn");
//get current time，moment object
// console.log(moment().toString());
// console.log(moment.utc().toString());

//Get timestamps
// console.log(moment().valueOf(), +moment());
// console.log(moment.utc().valueOf(), +moment.utc());

//Time format：xxxx-xx-xx xxxx/xx/xx
// console.log(moment(0).toString(), +moment(0));
// console.log(moment.utc(0).toString(), +moment.utc(0));
// const value = "1970-01-01 00:00:00";
// console.log(moment(value).toString(), +moment(value));
// console.log(moment.utc(value).toString(), +moment.utc(value));

//token： "YYYY-MM-DD HH:mm:ss"
// const formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];
// console.log(moment.utc("1970-01-01 00:00:00", formats, true).toString());
// console.log(moment.utc("1970-1-1 0:0:0", formats, true).toString());
// console.log(moment.utc(0, formats, true).toString());
// const invalidMoment = moment.utc(
//   "Thu Jan 01 1970 00:00:00 GMT+0000",
//   formats,
//   true
// );
// console.log(invalidMoment.isValid()); // false
// console.log(invalidMoment.toString());
// console.log(+invalidMoment);

// 
// const m = moment.utc("2015-1-5 23:00:01", formats, true);
// console.log(m.local().format("YYYY-MM--DD HH:mm:ss"));

// const m = moment("2015-1-5 23:00:01", formats, true);
// const toServer = m.utc().format("YYYY-MM-DD HH:mm:ss");
// console.log(toServer);

// const m = moment.utc("2020-4-14 9:00:01", formats, true);
// console.log(m.local().fromNow());

// const { sqlLogger } = require("./logger");
// setInterval(() => {
//     sqlLogger.debug("one sql")
// }, 100);

require("./init");



// async function test() {
//     const waterPath = path.resolve(__dirname, "./waterChrisyo.png");
//     const orginalPath = path.resolve(__dirname, "./orginal.jpg");
//     const targetPath = path.resolve(__dirname, "./new.jpg");

//     mark(waterPath, orginalPath, targetPath);
// }

// test();