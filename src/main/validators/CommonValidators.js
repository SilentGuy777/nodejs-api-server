/*
    Author: Premkumar
    Description : Common validation functions that can be used acrossed the directories.
*/

// Checks if received data conforms to email address format and syntax.
exports.checkIfDataIsEmailAddr = (data) => {
    const emailValidator = require('email-validator');
    return emailValidator.validate(data);
};

// Checks if received data is null, empty or only whitespaces.
exports.checkIfEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
}