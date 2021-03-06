"use strict";
// Type definitions for @alpler/logger
// Project: https://github.com/Aelpler/-alpler-logger
// Author: https://github.com/Aelpler
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.log = exports.deleteFiles = exports.createFiles = exports.setLogLevel = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logLevel_1 = require("./logLevel");
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return logLevel_1.LogLevel; } });
/**
 * Level at which a message will be logged
 * default: LogLevel.INFO
 */
let _logLevel = logLevel_1.LogLevel.INFO;
/**
 * Folder in which logs will be saved
 */
let _logFolder = "logs";
/**
 * File where all messages will end up
 */
let _log_File = "log.log";
/**
 * File where messages with level greater than LogLevel.WARN will end up
 */
let _log_Error_File = "errors.log";
/**
 * Set log level at which it will log messages
 * @param {LogLevel} logLevel How important a message needs to be, to be loged
 * @public
 */
function setLogLevel(logLevel) {
    _logLevel = logLevel;
}
exports.setLogLevel = setLogLevel;
/**
 * Create local files in which you log messages will end up.
 * Folder in which log.log and erros.log will be
 * @public
 */
function createFiles() {
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder)))
        fs_1.default.mkdirSync(path_1.default.join("./", _logFolder));
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder, _log_File)))
        fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_File), "");
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder, _log_Error_File)))
        fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_Error_File), "");
}
exports.createFiles = createFiles;
/**
 * Delete local files with log messages
 * In order to continue without messages don't forget to use createFiles() after
 * @public
 */
function deleteFiles() {
    if (fs_1.default.existsSync(path_1.default.join("./", _logFolder)))
        fs_1.default.rmSync(path_1.default.join("./", _logFolder), { recursive: true, force: true });
}
exports.deleteFiles = deleteFiles;
/**
 * Log messages into file and also into console
 * @param {LogLevel} logLevel Imporatance of you message
 * @param {string} location Where in the program a message came from
 * @param {string} text The message you want to log
 * @public
 */
function log(logLevel, location, text) {
    let formatedLog = formatText(logLevel, location, text);
    // If logLevel is greater than error write also to error.log
    if (logLevel >= 3000) {
        fs_1.default.appendFile(path_1.default.join("./", _logFolder, _log_Error_File), formatedLog, function (err) {
            if (err)
                console.log(`Couldn't write to error log ${err}`);
        });
    }
    // Logs if logLevel from message is greater or simular to set _logLevel
    if (_logLevel <= logLevel) {
        fs_1.default.appendFile(path_1.default.join("./", _logFolder, _log_File), formatedLog, function (err) {
            if (err)
                console.log(`Couldn't write to log file ${err}`);
        });
    }
    if (logLevel >= 3000 || _logLevel <= logLevel) {
        console.log(formatedLog);
    }
}
exports.log = log;
/**
 * Formats the given parameters into single text so all have the same format
 * @param {LogLevel} logLevel Imporatance of you message
 * @param {string} location Where in the program a message came from
 * @param {string} text The message you want to log
 * @return {string} Formated log message with date,time,level,location,text
 */
function formatText(logLevel, location, text) {
    let date = new Date();
    let dateString = `[${formatNumber(date.getDate())}.${formatNumber(date.getMonth())}.${date.getFullYear()}]`;
    let timeString = `[${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}]`;
    return `${dateString} ${timeString} ${logLevel_1.LogLevel[logLevel]} ${location} ${text}\n`;
}
/**
 * Converts a number to string, adds n is below value of 10
 * @param {number} n Number which will be converted to string
 * @return {string} Formated number, with may added 0
 */
function formatNumber(n) {
    return (n < 10 ? '0' : '') + n;
}
