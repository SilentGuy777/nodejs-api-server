
/*
    Author: Premkumar
    Description: Contains the utility functions used for logging.
*/

// Logs printed for debugging and to print out system messages to track processing.
exports.debug = (className, methodName, message) => {
    var logmsg = {
        class: className,
        method: methodName,
        message: message
    };

    console.log(JSON.stringify(logmsg));
}

// Logs printed to record errors encounterd.
exports.error = (className, methodName, errorCode, message) => {
    var errormsg = {
        class: className,
        method: methodName,
        errorCode: errorCode,
        message: message
    };

    console.error(JSON.stringify(errormsg));
}