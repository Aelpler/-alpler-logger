"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class AlpLogger {
    constructor(logFolder) {
        this._logFolder = "logs";
        this._log_Error_File = "errors.log";
        this._log_Info_File = "infos.log";
        this._log_All_File = "all.log";
        if (logFolder)
            this._logFolder = logFolder;
        this.createFiles();
        this.logAll("LOGGER", " ----- ----- ----- ----- START OF NEW LOG SESSION ----- ----- ----- ----- ");
    }
    createFiles() {
        if (!fs_1.default.existsSync(path_1.default.join("./", this._logFolder)))
            fs_1.default.mkdirSync(path_1.default.join("./", this._logFolder));
        if (!fs_1.default.existsSync(path_1.default.join("./", this._logFolder, this._log_All_File)))
            fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_All_File), "");
        if (!fs_1.default.existsSync(path_1.default.join("./", this._logFolder, this._log_Error_File)))
            fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_Error_File), "");
        if (!fs_1.default.existsSync(path_1.default.join("./", this._logFolder, this._log_Info_File)))
            fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_Info_File), "");
    }
    deleteFiles() {
        if (fs_1.default.existsSync(path_1.default.join("./", this._logFolder)))
            fs_1.default.rmdirSync(path_1.default.join("./", this._logFolder));
    }
    log(location, text, type) {
        if (!type)
            type = "NORMAL";
        fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_All_File), this.addPreText(location, type, text), { flag: 'a+' });
        console.log(this.addPreText(location, type, text));
    }
    logInfo(location, text) {
        let type = "INFO";
        this.log(location, text, type);
        fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_Info_File), this.addPreText(location, type, text), { flag: 'a+' });
        console.log(this.addPreText(location, type, text));
    }
    logError(location, text) {
        let type = "ERROR";
        this.log(location, text, type);
        fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_Error_File), this.addPreText(location, type, text), { flag: 'a+' });
        console.error(this.addPreText(location, type, text));
    }
    logAll(location, text, type) {
        if (!type)
            type = "ALL";
        fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_Info_File), this.addPreText(location, type, text), { flag: 'a+' });
        fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_Error_File), this.addPreText(location, type, text), { flag: 'a+' });
        fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, this._log_All_File), this.addPreText(location, type, text), { flag: 'a+' });
    }
    logCustom(type, location, text) {
        if (!fs_1.default.existsSync(path_1.default.join("./", this._logFolder)))
            fs_1.default.mkdirSync(path_1.default.join("./", this._logFolder));
        if (!fs_1.default.existsSync(path_1.default.join("./", this._logFolder, type + ".log")))
            fs_1.default.writeFileSync(path_1.default.join("./", this._logFolder, type + ".log"), this.addPreText(location, type, text));
    }
    addPreText(location, type, text) {
        let date = new Date();
        let dateString = `[${this.formatNumber(date.getDate())}.${this.formatNumber(date.getMonth())}.${date.getFullYear()}]`;
        let timeString = `[${this.formatNumber(date.getHours())}:${this.formatNumber(date.getMinutes())}]`;
        return `${dateString} ${timeString} ${location} ${text}\n`;
    }
    formatNumber(n) {
        return (n < 10 ? '0' : '') + n;
    }
}
let instance;
function Logger() {
    if (!instance)
        instance = new AlpLogger();
    return instance;
}
exports.Logger = Logger;
