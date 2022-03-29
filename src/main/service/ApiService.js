/*
    Author: Premkumar
    Description: Api Service that handles the business & processing logics for requests received from Api Controller.
*/

const responseModel = require('../model/response/ResponseModel');
const studentService = require('./StudentService');
const teacherService = require('./TeacherService');
const responseCodeConstants = require('../constants/ResponseCodeConstants');
const className = "StudentService";

// Service that handles business and processing logics for registeringStudent API call request.
exports.registerStudentsService = (data) => {
    var responseData = null;

    var addedRecords = [];
    var skippedRecords = [];
    var errorRecords = []
    var updatedRecords = [];

    // 1. INSERT teacher record to Teachers table if record not found. If found, skip insert to Teachers table.
    teacherService.addTeacherRecord(data.teacher, addedRecords, skippedRecords, errorRecords);

    // 2. INSERT each student records to Students table if record not found. If found, skip insert to Students table.
    data.students.forEach((student) =>{
        studentService.addStudentRecord(data.teacher, student, addedRecords, skippedRecords, updatedRecords, errorRecords);
    });

    var overallSuccess = {
        added: addedRecords,
        skipped: skippedRecords,
        updated: updatedRecords
    };

    if(errorRecords && errorRecords.length > 0){
        if((addedRecords && addedRecords.length > 0)  || (skippedRecords && skippedRecords.length > 0) || (updatedRecords && updatedRecords.length > 0)){
            // Response when partial processing is successful with some errors (partial success).
            responseData = new responseModel(responseCodeConstants.HTTP_RESP_PARTIAL_SUCCESS_CODE, overallSuccess, errorRecords, true);
        }else{
            // Response when all processing failed (fail).
            responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, "Failed to Regsiter students under teacher.", errorRecords, false);
        }
    }else{
        // Response when all processing has no errors (successful)
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_NO_CONTENT_SUCCESS_CODE, overallSuccess, [], true);
    }

    return responseData;
}

// Service that handles business and processing logics for retrieveStudentsCommonToTeachers API call request.
exports.retrieveStudentsCommonToTeachers = (teachers) => {
    // 1. SELECT records from Student table common to provided list of teachers.
    return studentService.retrieveStudentsCommonToTeachers(teachers);
}

// Service that handles business and processing logics for suspendStudent API call request.
exports.suspendStudent = (data) => {
    var responseData = null;
    var errorRecords = []
    var updatedRecords = [];

    // Update Student Record on their status to 'suspend'.
    studentService.suspendStudent(data.student, updatedRecords, errorRecords);

    if(errorRecords && errorRecords.length > 0){
        // Response when processing got errors (fail).
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, 'Failed to suspend student(' + data.student + ').', errorRecords, false);
    }else{
        // Response when processing got no errors (successful).
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_NO_CONTENT_SUCCESS_CODE, updatedRecords, [], true);
    }

    return responseData;
}

// Service that handles business and processing logics for retrieveStudentsForNotifications API call request.
exports.retrieveStudentsForNotifications = (teacher, notificationEmailList) => {
    var responseData = null;
    var errorRecords = [];
    var fetchedEmailList = [];

    // 1. SELECT records from Student table common to the provided teacher.
    studentService.retrieveStudentsUnderTeacher(teacher, fetchedEmailList, errorRecords);

    // 2. SELECT records from Students table mentioned in notification message.
    if(errorRecords.length <= 0){
        studentService.checkStudentsFromNotification(notificationEmailList,fetchedEmailList, errorRecords);
    }
    
    if(errorRecords && errorRecords.length > 0){
        // Response when processing got errors (fail).
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, 'Failed to retrieve students for notifications.', errorRecords, false);
    }else{
        // Response when processing got no errors (successful).
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_SUCCESS_CODE, [...new Set(fetchedEmailList)], [], true);
    }

    return responseData;
}