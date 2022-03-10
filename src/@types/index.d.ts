declare module 'alplogger' {

    import fs from "fs"

    export class AlpLogger {

        log(location: string, text: string, type?: string): void
        logInfo(location: string, text: string): void
        logError(location: string, text: string): void
        logAll(location: string, text: string, type?: string): void
        logCustom(type: string, location: string, text: string): void

        deleteFiles(): void
    }

    export function Logger(): AlpLogger

}