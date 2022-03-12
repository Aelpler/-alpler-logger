
export function createFiles(): void
export function deleteFiles(): void

export function log(location: string, text: string, type?: string): void

export function logInfo(location: string, text: string): void
export function logError(location: string, text: string): void

export function logAll(location: string, text: string, type?: string): void

export function logCustom(type: string, location: string, text: string): void
