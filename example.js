"use strict";
const logger = require("@alpler/logger")

logger.logger.setLogLevel(logger.LogLevel.INFO)
logger.logger.log(logger.LogLevel.ERROR, "example.js:5", "There is no code left to execute :(")
