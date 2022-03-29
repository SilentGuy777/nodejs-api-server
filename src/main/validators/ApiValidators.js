/*
    Author: Premkumar
    Description : Validation functions that are used for those request data received from ApiController.js
*/
var commonValidators = require('./CommonValidators');
var commonUtils = require('../utils/CommonUtils');


// Validate the request data received from registerStudent API endpoint.
exports.validateRegisterStudent = (data) => {
    var errors = [];

    if(!data){
        errors.push("Request Body data is null / empty.")
    }

    // Validate JSON key (teacher) --------------------------------
    if(data && !data.teacher){
        errors.push("JSON key (teacher) is missing / value is empty.");
    }

    if(data && data.teacher && !commonValidators.checkIfDataIsEmailAddr(data.teacher)){
        errors.push("Data is not valid for JSON key (teacher). Email address is expected.");
    }

    // Validate JSON key (students) --------------------------------
    if(data && !data.students){
        errors.push("JSON key (students) is missing / value is empty.");
    }

    if(data && data.students && !Array.isArray(data.students)){
        errors.push("Data is not valid for JSON key (students). Expecting JSON array.");
    }

    if(data && data.students && Array.isArray(data.students) && data.students.length <= 0){
        errors.push("Data is not valid for JSON key (students). Array is empty.");
    }

    if(data && data.students && Array.isArray(data.students) && data.students.length > 0){
        data.students.forEach((student) =>{
            if(!student){
                errors.push("Data is not valid for JSON key (students). Data is null / empty.");
            }

            if(student && !commonValidators.checkIfDataIsEmailAddr(student)){
                errors.push("Data is not valid for JSON key (students). Email address is expected.");
            }
        });
    }

    return commonUtils.generateApiValidationResp(errors);
}

// Validate the request data received from retrieveStudentsCommonToTeachers API endpoint.
exports.validateRetrieveStudentsCommonToTeachers = (data) =>{
    var errors = [];

    // Validate Request Param (teacher)
    if(!data){
        errors.push("Request Param (teacher) is null / empty.")
    }

    if(data && !Array.isArray(data) && !commonValidators.checkIfDataIsEmailAddr(data)){
        errors.push("Data is not valid for Request Param (teacher). Email address is expected.");
    }

    if(data && Array.isArray(data) && data.length > 0){
        data.forEach((teacher) =>{
            if(!teacher){
                errors.push("Data is not valid for Request Param (teacher). Data is null / empty.");
            }

            if(teacher && !commonValidators.checkIfDataIsEmailAddr(teacher)){
                errors.push("Data is not valid for Request Param (teacher). Email address is expected.");
            }
        });
    }

    return commonUtils.generateApiValidationResp(errors);
}


// Validate the request data received from suspendStudent API endpoint.
exports.validateSuspendStudent = (data) => {
    var errors = [];

    if(!data){
        errors.push("Request Body data is null / empty.")
    }

    // Validate JSON key (student) --------------------------------
    if(data && !data.student){
        errors.push("JSON key (student) is missing / value is empty.");
    }

    if(data && data.student && !commonValidators.checkIfDataIsEmailAddr(data.student)){
        errors.push("Data is not valid for JSON key (student). Email address is expected.");
    }

    return commonUtils.generateApiValidationResp(errors);
}


// Validate the request data received from retrieveStudentsForNotifications API endpoint.
exports.validateRetrieveStudentsForNotifications = (data) => {
    var errors = [];

    if(!data){
        errors.push("Request Body data is null / empty.")
    }

    // Validate JSON key (teacher) --------------------------------
    if(data && !data.teacher){
        errors.push("JSON key (teacher) is missing / value is empty.");
    }

    if(data && data.teacher && !commonValidators.checkIfDataIsEmailAddr(data.teacher)){
        errors.push("Data is not valid for JSON key (teacher). Email address is expected.");
    }

    // Validate JSON key (notification) --------------------------------
    if(data && !data.notification){
        errors.push("JSON key (notification) is missing / value is empty.");
    }

    if(data && data.notification){
        var pattern = new RegExp('@([a-zA-Z0-9\_\.]+)', 'gim');
        var students = data.notification.match(pattern);

        if(students && Array.isArray(students) && students.length > 0 && students.length % 2 != 0){
            errors.push("JSON key (notification) has invalid emails mentioned. Please check the mentioned emails in notification.");
        }
    }

    return commonUtils.generateApiValidationResp(errors);
}

// Validate the email list retrieved from notification message from retrieveStudentsForNotifications API endpoint.
exports.validateNotificationEmailList = (notificationEmailList, responseData) => {
    var errors = [];

    console.log("Email List : " + JSON.stringify(notificationEmailList));

    if(notificationEmailList && Array.isArray(notificationEmailList) && notificationEmailList.length > 0){
        notificationEmailList.forEach((email) => {
            if(!email){
                errors.push("Student Email in Notification is either empty or not formatted properly!");
            }

            if(email && !commonValidators.checkIfDataIsEmailAddr(email)){
                errors.push("Student Email (" + email + ") is invalid in Notification Content.");
            }
        });
    }

    if(errors && errors.length > 0 && responseData){
        if(responseData.isSuccess){
            responseData.code = 400;
            responseData.message = "Data Validation Failed for Notification Content."
            responseData.isSuccess = false;
        }

        responseData.errors = responseData.errors.concat(errors);
    }

    return responseData;
}