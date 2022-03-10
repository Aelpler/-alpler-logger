import fs from "fs"
import path from "path"

class AlpLogger {

    private _logFolder = "logs"

    private _log_Error_File = "errors.log"
    private _log_Info_File = "infos.log"
    private _log_All_File = "all.log"

    constructor(logFolder?: string) {
        if (logFolder)
            this._logFolder = logFolder

        this.createFiles()

        this.logAll("LOGGER", " ----- ----- ----- ----- START OF NEW LOG SESSION ----- ----- ----- ----- ")
    }

    private createFiles() {
        if (!fs.existsSync(path.join("./", this._logFolder)))
            fs.mkdirSync(path.join("./", this._logFolder))

        if (!fs.existsSync(path.join("./", this._logFolder, this._log_All_File)))
            fs.writeFileSync(path.join("./", this._logFolder, this._log_All_File), "")
        if (!fs.existsSync(path.join("./", this._logFolder, this._log_Error_File)))
            fs.writeFileSync(path.join("./", this._logFolder, this._log_Error_File), "")
        if (!fs.existsSync(path.join("./", this._logFolder, this._log_Info_File)))
            fs.writeFileSync(path.join("./", this._logFolder, this._log_Info_File), "")
    }

    deleteFiles() {
        if (fs.existsSync(path.join("./", this._logFolder)))
            fs.rmdirSync(path.join("./", this._logFolder))
    }

    log(location: string, text: string, type?: string): void {
        if (!type)
            type = "NORMAL"
        fs.writeFileSync(path.join("./", this._logFolder, this._log_All_File), this.addPreText(location, type, text), { flag: 'a+' })

        console.log(this.addPreText(location, type, text))
    }

    logInfo(location: string, text: string) {
        let type = "INFO"
        this.log(location, text, type)
        fs.writeFileSync(path.join("./", this._logFolder, this._log_Info_File), this.addPreText(location, type, text), { flag: 'a+' })

        console.log(this.addPreText(location, type, text))
    }

    logError(location: string, text: string) {
        let type = "ERROR"
        this.log(location, text, type)
        fs.writeFileSync(path.join("./", this._logFolder, this._log_Error_File), this.addPreText(location, type, text), { flag: 'a+' })

        console.error(this.addPreText(location, type, text))
    }

    logAll(location: string, text: string, type?: string) {
        if (!type)
            type = "ALL"

        fs.writeFileSync(path.join("./", this._logFolder, this._log_Info_File), this.addPreText(location, type, text), { flag: 'a+' })
        fs.writeFileSync(path.join("./", this._logFolder, this._log_Error_File), this.addPreText(location, type, text), { flag: 'a+' })
        fs.writeFileSync(path.join("./", this._logFolder, this._log_All_File), this.addPreText(location, type, text), { flag: 'a+' })
    }

    logCustom(type: string, location: string, text: string) {
        if (!fs.existsSync(path.join("./", this._logFolder)))
            fs.mkdirSync(path.join("./", this._logFolder))

        if (!fs.existsSync(path.join("./", this._logFolder, type + ".log")))
            fs.writeFileSync(path.join("./", this._logFolder, type + ".log"), this.addPreText(location, type, text))
    }

    private addPreText(location: string, type: string, text: string) {
        let date = new Date()
        let dateString = `[${this.formatNumber(date.getDate())}.${this.formatNumber(date.getMonth())}.${date.getFullYear()}]`
        let timeString = `[${this.formatNumber(date.getHours())}:${this.formatNumber(date.getMinutes())}]`
        return `${dateString} ${timeString} ${location} ${text}\n`
    }

    private formatNumber(n: number): string {
        return (n < 10 ? '0' : '') + n;
    }
}

let instance: AlpLogger

function Logger() {
    if (!instance)
        instance = new AlpLogger()
    return instance
}

export { Logger }