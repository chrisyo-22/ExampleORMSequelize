const log4js = require("log4js");
const path = require("path");

// Configure log4js with appenders and categories
log4js.configure({
    // Appenders: Define where and how logs should be written
    appenders: {
        // SQL log appender - handles database-related logging
        sql: {
            // Define a SQL log output appender
            type: "dateFile", // Uses date-based file rotation
            filename: path.resolve(__dirname, "logs", "sql", "logging.log"), // Path to log file
            maxLogSize: 1024 * 1024, // Maximum file size in bytes before rotation (1KB)
            keepFileExt: true, // Preserve .log extension when rotating files
            // Layout: Define how log messages should be formatted
            layout: {
                type: "pattern", // Use pattern-based formatting
                // Pattern explanation:
                // %c = category name (e.g., "sql")
                // %d{yyyy-MM-dd hh:mm:ss} = timestamp in specified format
                // %p = log level (INFO, DEBUG, ERROR, etc.)
                // %m = log message
                // %n = newline character
                pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
            },
            numBackups: 10, // Keep maximum 10 backup files (oldest gets deleted when exceeded)
        },
        // Default appender - outputs to console (stdout)
        default: {
            type: "stdout", // Standard output (console)
        },
    },
    // Categories: Define which appenders to use for different types of logs
    categories: {
        // SQL category - uses the sql appender configuration to write logs
        sql: {
            appenders: ["sql"], // This category uses the 'sql' appender defined above
            level: "all", // Log all levels (TRACE, DEBUG, INFO, WARN, ERROR, FATAL)
        },
        // Default category - fallback for any logger that doesn't match other categories
        default: {
            appenders: ["default"], // Uses console output
            level: "all", // Log all levels
        },
    },
});

// Gracefully shutdown log4js when the process exits
// This ensures all pending log writes are completed before termination
process.on("exit", () => {
    log4js.shutdown();
});

// Create a logger instance for SQL-related logging
// This logger will use the 'sql' category configuration
const sqlLogger = log4js.getLogger("sql");
const defaultLogger = log4js.getLogger();

// Example usage: Log a message every 100ms for testing
// In production, replace this with actual SQL operation logging
// setInterval(() => {
//     sql_logger.info("Testing log sql, done")
// }, 100)

// Alternative way to handle graceful shutdown (currently commented out)
// process.on("exit", () => {
//     log4js.shutdown();
// })


exports.sqlLogger = sqlLogger;