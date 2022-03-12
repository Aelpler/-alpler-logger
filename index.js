"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let _logFolder = "logs";
let _log_Error_File = "errors.log";
let _log_Info_File = "infos.log";
let _log_All_File = "all.log";
function createFiles() {
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder)))
        fs_1.default.mkdirSync(path_1.default.join("./", _logFolder));
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder, _log_All_File)))
        fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_All_File), "");
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder, _log_Error_File)))
        fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_Error_File), "");
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder, _log_Info_File)))
        fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_Info_File), "");
}
function deleteFiles() {
    if (fs_1.default.existsSync(path_1.default.join("./", _logFolder)))
        fs_1.default.rmdirSync(path_1.default.join("./", _logFolder));
}
function log(location, text, type) {
    if (!type)
        type = "NORMAL";
    fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_All_File), addPreText(location, type, text), { flag: 'a+' });
    console.log(addPreText(location, type, text));
}
function logInfo(location, text) {
    let type = "INFO";
    log(location, text, type);
    fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_Info_File), addPreText(location, type, text), { flag: 'a+' });
    console.log(addPreText(location, type, text));
}
function logError(location, text) {
    let type = "ERROR";
    log(location, text, type);
    fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_Error_File), addPreText(location, type, text), { flag: 'a+' });
    console.error(addPreText(location, type, text));
}
function logAll(location, text, type) {
    if (!type)
        type = "ALL";
    fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_Info_File), addPreText(location, type, text), { flag: 'a+' });
    fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_Error_File), addPreText(location, type, text), { flag: 'a+' });
    fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, _log_All_File), addPreText(location, type, text), { flag: 'a+' });
}
function logCustom(type, location, text) {
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder)))
        fs_1.default.mkdirSync(path_1.default.join("./", _logFolder));
    if (!fs_1.default.existsSync(path_1.default.join("./", _logFolder, type + ".log")))
        fs_1.default.writeFileSync(path_1.default.join("./", _logFolder, type + ".log"), addPreText(location, type, text));
}
function addPreText(location, type, text) {
    let date = new Date();
    let dateString = `[${formatNumber(date.getDate())}.${formatNumber(date.getMonth())}.${date.getFullYear()}]`;
    let timeString = `[${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}]`;
    return `${dateString} ${timeString} ${location} ${text}\n`;
}
function formatNumber(n) {
    return (n < 10 ? '0' : '') + n;
}
createFiles();
exports.default = { log, logAll, logError, logInfo, logCustom, deleteFiles, createFiles };
