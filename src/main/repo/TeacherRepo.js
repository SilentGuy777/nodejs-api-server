/*
    Author: Premkumar
    Description: Teacher Repository that connect to Teachers table in database to perform SQL operations.
*/

const responseModel = require('../model/response/ResponseModel');
const datasource = require('../config/DBConfig')();
const loggingUtils = require('../utils/LoggingUtils');
const responseCodeConstants = require('../constants/ResponseCodeConstants');
const errorCodeConstants = require('../constants/ErrorCodeConstants');
const className = "TeacherRepo";

// Search (SELECT Query) for teacher records by teacher email address, in Teachers DB table. 
exports.searchTeacher = (teacher) => {
    const functionName = "searchTeacher";

    var errors = [];
    var dbQueryResult = null;

    let selectStmt = 'SELECT * FROM Teachers where email = ?';
    let selectValue = [teacher];

    var responseData = null;
    loggingUtils.debug(className, functionName, "Making Query to DB : " + selectStmt);

    try{
        dbQueryResult = datasource.query(selectStmt, selectValue);
        loggingUtils.debug(className, functionName, "DB Results : " + JSON.stringify(dbQueryResult));

    }catch(err){
        loggingUtils.error(className, functionName, errorCodeConstants.DB_TEACHERS_SEARCHTEACHER_ERROR_CODE_DB1001, "DB ERROR : " + err.message);
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

// Add (INSERT Query) new Teacher record to Teachers DB table.
exports.addTeacher = (teacher) => {
    const functionName = "addTeacher";

    var errors = [];
    var dbQueryResult = null;

    let insertStmt = 'INSERT INTO Teachers (email) VALUES (?)';
    let insertValue = [teacher];

    var responseData = null;
    loggingUtils.debug(className, functionName, "Making Query to DB : " + insertStmt);

    try{
        dbQueryResult = datasource.query(insertStmt, insertValue);
        loggingUtils.debug(className, functionName, "DB Results : " + JSON.stringify(dbQueryResult));

    }catch(err){
        loggingUtils.error(className, functionName, errorCodeConstants.DB_TEACHERS_ADDTEACHER_ERROR_CODE_DB0002, "DB ERROR : " + err.message);
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