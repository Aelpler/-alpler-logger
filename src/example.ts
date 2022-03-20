import { logger, LogLevel } from "@alpler/logger"

logger.setLogLevel(LogLevel.INFO)
logger.log(LogLevel.ERROR, "example.ts:3", "There is no code left to execute :(")