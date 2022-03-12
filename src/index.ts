import fs from "fs"
import path from "path"

let _logFolder = "logs"
let _log_Error_File = "errors.log"
let _log_Info_File = "infos.log"
let _log_All_File = "all.log"

function createFiles() {
    if (!fs.existsSync(path.join("./", _logFolder)))
        fs.mkdirSync(path.join("./", _logFolder))

    if (!fs.existsSync(path.join("./", _logFolder, _log_All_File)))
        fs.writeFileSync(path.join("./", _logFolder, _log_All_File), "")
    if (!fs.existsSync(path.join("./", _logFolder, _log_Error_File)))
        fs.writeFileSync(path.join("./", _logFolder, _log_Error_File), "")
    if (!fs.existsSync(path.join("./", _logFolder, _log_Info_File)))
        fs.writeFileSync(path.join("./", _logFolder, _log_Info_File), "")
}

function deleteFiles() {
    if (fs.existsSync(path.join("./", _logFolder)))
        fs.rmdirSync(path.join("./", _logFolder))
}

function log(location: string, text: string, type?: string): void {
    if (!type)
        type = "NORMAL"
    fs.writeFileSync(path.join("./", _logFolder, _log_All_File), addPreText(location, type, text), { flag: 'a+' })

    console.log(addPreText(location, type, text))
}

function logInfo(location: string, text: string) {
    let type = "INFO"
    log(location, text, type)
    fs.writeFileSync(path.join("./", _logFolder, _log_Info_File), addPreText(location, type, text), { flag: 'a+' })

    console.log(addPreText(location, type, text))
}

function logError(location: string, text: string) {
    let type = "ERROR"
    log(location, text, type)
    fs.writeFileSync(path.join("./", _logFolder, _log_Error_File), addPreText(location, type, text), { flag: 'a+' })

    console.error(addPreText(location, type, text))
}

function logAll(location: string, text: string, type?: string) {
    if (!type)
        type = "ALL"

    fs.writeFileSync(path.join("./", _logFolder, _log_Info_File), addPreText(location, type, text), { flag: 'a+' })
    fs.writeFileSync(path.join("./", _logFolder, _log_Error_File), addPreText(location, type, text), { flag: 'a+' })
    fs.writeFileSync(path.join("./", _logFolder, _log_All_File), addPreText(location, type, text), { flag: 'a+' })
}

function logCustom(type: string, location: string, text: string) {
    if (!fs.existsSync(path.join("./", _logFolder)))
        fs.mkdirSync(path.join("./", _logFolder))

    if (!fs.existsSync(path.join("./", _logFolder, type + ".log")))
        fs.writeFileSync(path.join("./", _logFolder, type + ".log"), addPreText(location, type, text))
}

function addPreText(location: string, type: string, text: string) {
    let date = new Date()
    let dateString = `[${formatNumber(date.getDate())}.${formatNumber(date.getMonth())}.${date.getFullYear()}]`
    let timeString = `[${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}]`
    return `${dateString} ${timeString} ${location} ${text}\n`
}

function formatNumber(n: number): string {
    return (n < 10 ? '0' : '') + n;
}


createFiles()

export default { log, logAll, logError, logInfo, logCustom, deleteFiles, createFiles }

