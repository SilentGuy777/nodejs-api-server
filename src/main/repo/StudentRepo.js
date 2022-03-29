/*
    Author: Premkumar
    Description: Student Repository that connect to Students table in database to perform SQL operations.
*/


const responseModel = require('../model/response/ResponseModel');
const datasource = require('../config/DBConfig')();
const loggingUtils = require('../utils/LoggingUtils');
const responseCodeConstants = require('../constants/ResponseCodeConstants');
const errorCodeConstants = require('../constants/ErrorCodeConstants');
const className = "StudentRepo";

// Search (SELECT Query) for student records by student email address, in Students DB table. 
exports.searchStudent = (student) => {
    const functionName = "searchStudent";

    var errors = [];
    var dbQueryResult = null;

    let selectStmt = 'SELECT * FROM Students where email = ?';
    let selectValue = [student];

    var responseData = null;
    loggingUtils.debug(className, functionName, "Making Query to DB : " + selectStmt);

    try{
        dbQueryResult = datasource.query(selectStmt, selectValue);
        loggingUtils.debug(className, functionName, "DB Results : " + JSON.stringify(dbQueryResult));

    }catch(err){
        loggingUtils.error(className, functionName, errorCodeConstants.DB_STUDENTS_SEARCHSTUDENTS_ERROR_CODE_DB0001, "DB ERROR : " + err.message);
        errors.push(err.message);
    }

    // Return Validation Outcome accordingly.
    if(errors && errors.length > 0){
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, 'DB Query Failed.', errors, false);
    }else{
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_SUCCESS_CODE, dbQueryResult, errors, true);
    }

    return responseData;
}

// Search (SELECT Query) for student records by student and teacher email address, in Students DB table. 
exports.searchTeacherStudent = (teacher, student) => {
    const functionName = "searchTeacherStudent";

    var errors = [];
    var dbQueryResult = null;

    let selectStmt = 'SELECT * FROM Students where email = ? AND teachers LIKE CONCAT("%", ? "%")';
    let selectValue = [student, teacher];

    var responseData = null;
    loggingUtils.debug(className, functionName, "Making Query to DB : " + selectStmt);

    try{
        dbQueryResult = datasource.query(selectStmt, selectValue);
        loggingUtils.debug(className, functionName, "DB Results : " + JSON.stringify(dbQueryResult));

    }catch(err){
        loggingUtils.error(className, functionName, errorCodeConstants.DB_STUDENTS_SEARCHTEACHERSTUDENT_ERROR_CODE_DB0002, "DB ERROR : " + err.message);
        errors.push(err.message);
    }

    // Return Validation Outcome accordingly.
    if(errors && errors.length > 0){
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, 'DB Query Failed.', errors, false);
    }else{
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_SUCCESS_CODE, dbQueryResult, errors, true);
    }

    return responseData;
}

// Update (UPDATE Query) the list of teacher emails tied to student, for student record in Students DB table.
exports.updateStudentTeachers = (teachers, student) => {
    const functionName = "updateStudentTeachers";

    var errors = [];
    var dbQueryResult = null;

    let updateStmt = 'UPDATE Students SET teachers = ? WHERE email = ?';
    let updateValue = [teachers, student];

    var responseData = null;
    loggingUtils.debug(className, functionName, "Making Query to DB : " + updateStmt);

    try{
        dbQueryResult = datasource.query(updateStmt, updateValue);
        loggingUtils.debug(className, functionName, "DB Results : " + JSON.stringify(dbQueryResult));

    }catch(err){
        loggingUtils.error(className, functionName, errorCodeConstants.DB_STUDENTS_UPDATESTUDENTTEACHERS_ERROR_CODE_DB0003, "DB ERROR : " + err.message);
        errors.push(err.message);
    }

    // Return Validation Outcome accordingly.
    if(errors && errors.length > 0){
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, 'DB Query Failed.', errors, false);
    }else{
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_SUCCESS_CODE, dbQueryResult, errors, true);
    }

    return responseData;
}

// Add (INSERT Query) new Student record to Students DB table.
exports.addStudent = (teacher, student) => {
    var functionName = "addStudent";

    var errors = [];
    var dbQueryResult = null;

    let insertStmt = 'INSERT INTO Students (email, teachers, status) VALUES (?, ?, ?)';
    let insertValue = [student, teacher, "active"];

    var responseData = null;
    loggingUtils.debug(className, functionName, "Making Query to DB : " + insertStmt);

    try{
        dbQueryResult = datasource.query(insertStmt, insertValue);
        loggingUtils.debug(className, functionName, "DB Results : " + JSON.stringify(dbQueryResult));

    }catch(err){
        loggingUtils.error(className, functionName, errorCodeConstants.DB_STUDENTS_ADDSTUDENT_ERROR_CODE_DB0004, "DB ERROR : " + err.message);
        errors.push(err.message);
    }

    // Return Validation Outcome accordingly.
    if(errors && errors.length > 0){
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, 'DB INSERT Failed.', errors, false);
    }else{
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_SUCCESS_CODE, '', errors, true);
    }

    return responseData;
}

// Search (SELECT Query) for student records by list of teacher's emails provided, in Students DB table. 
exports.retrieveStudentsCommonToTeachers = (teachers) => {
    const functionName = "retrieveStudentsCommonToTeachers";

    var errors = [];
    var dbQueryResult = null;

    let selectStmt = null;
    let selectValue = [];

    for(let i = 0; i < teachers.length; i++){
        if(i == 0){
            selectStmt = 'SELECT * FROM Students where teachers LIKE CONCAT("%", ? "%")'
        }else{
            selectStmt = selectStmt + ' AND teachers LIKE CONCAT("%", ? "%")';
        }

        selectValue.push(teachers[i]);
    }

    var responseData = null;
    loggingUtils.debug(className, functionName, "Making Query to DB : " + selectStmt);

    try{
        dbQueryResult = datasource.query(selectStmt, selectValue);
        loggingUtils.debug(className, functionName, "DB Results : " + JSON.stringify(dbQueryResult));

    }catch(err){
        loggingUtils.error(className, functionName, errorCodeConstants.DB_STUDENTS_RETRIEVESTUDENTSCOMMONTOTEACHERS_ERROR_CODE_DB0005, "DB ERROR : " + err.message);
        errors.push(err.message);
    }

    // Return Validation Outcome accordingly.
    if(errors && errors.length > 0){
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, 'DB Query Failed.', errors, false);
    }else{
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_SUCCESS_CODE, dbQueryResult, errors, true);
    }

    return responseData;
}

// Update (UPDATE Query) student's status in Students DB table.
exports.updateStudentStatus = (student, status) => {
    const functionName = "updateStudentStatus";

    var errors = [];
    var dbQueryResult = null;

    let updateStmt = 'UPDATE Students SET status = ? WHERE email = ?';
    let updateValue = [status, student];

    var responseData = null;
    loggingUtils.debug(className, functionName, "Making Query to DB : " + updateStmt);

    try{
        dbQueryResult = datasource.query(updateStmt, updateValue);
        loggingUtils.debug(className, functionName, "DB Results : " + JSON.stringify(dbQueryResult));

    }catch(err){
        loggingUtils.error(className, functionName, errorCodeConstants.DB_STUDENTS_UPDATESTUDENTSTATUS_ERROR_CODE_DB0006, "DB ERROR : " + err.message);
        errors.push(err.message);
    }

    // Return Validation Outcome accordingly.
    if(errors && errors.length > 0){
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, 'DB Query Failed.', errors, false);
    }else{
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_SUCCESS_CODE, dbQueryResult, errors, true);
    }

    return responseData;
}