enum LogLevel {


    /** Servere errors that might cause a crash */
    FATAL = 5000,
    /** Erros which may prevent normal execution of the program */
    ERROR = 4000,
    /** Potential problems which could also just be nothing */
    WARN = 3000,
    /** Information about the progress of the program */
    INFO = 2000,
    /** Detailed tracing messages for the progress of the program */
    DEBUG = 1000,
    /** All messages that did go through logging function */
    ALL = 0,

}

export { LogLevel }