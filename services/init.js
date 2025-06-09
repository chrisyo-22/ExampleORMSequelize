const validate = require("validate.js");
const moment = require("moment");

validate.extend(validate.validators.datetime, {
  /**
   * This function is automatically used for date format conversion
   * It triggers automatically during validation and needs to convert any data to timestamp return
   * If conversion fails, return NaN
   * @param {*} value The value to be converted
   * @param {*} options Validation configuration for a specific property
   */
  parse(value, options) {
    let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];
    if (options.dateOnly) {
      formats = ["YYYY-MM-DD", "YYYY-M-D", "x"];
    }
    return +moment.utc(value, formats, true);
  },
  /**
   * Display string used when showing error messages to users
   */
  format(value, options) {
    let format = "YYYY-MM-DD";
    if (!options.dateOnly) {
      format += " HH:mm:ss";
    }
    return moment.utc(value).format(format);
  },
});

