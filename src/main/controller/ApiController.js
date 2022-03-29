/*
    Author: Premkumar
    Description: Hosts the list of APIs endpoints starting with path : /api
*/

const apiValidators = require('../validators/ApiValidators');
const apiService = require('../service/ApiService');
const commonUtils = require('../utils/CommonUtils');
const loggingUtils = require('../utils/LoggingUtils');
const responseCodeConstants = require('../constants/ResponseCodeConstants');
const errorCodeConstants = require('../constants/ErrorCodeConstants');
const responseModel = require('../model/response/ResponseModel');
const className = "ApiController";

/*
Author: Premkumar
Description : User Story 1 - As a teacher, I want to register one or more students to a specified teacher.
HTTP Method : POST
*/
exports.registerStudents = (api) => {
    const functionName = "registerStudents";

    api.post('/api/register', function(req, res) {
        try{
            const requestBody = req.body;
            const requestParam = req.query;
        
            loggingUtils.debug(className, functionName, "Request Body : " + JSON.stringify(requestBody));
            loggingUtils.debug(className, functionName, "Request Params : " + JSON.stringify(requestParam));

            let responseData = apiValidators.validateRegisterStudent(requestBody);

            if(responseData.isSuccess){
                // Register Student to DB. If required, to add Teacher record if not present.
                responseData = apiService.registerStudentsService(requestBody);
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(responseData.code);
            res.send(responseData);
        }catch(err){
            let responseDataError = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, "UNEXPECTED ERROR encountered : " + err, [], false);
            loggingUtils.error(className, functionName, errorCodeConstants.EXCEPTION_ERROR_CODE_ERR0001, "UNEXPECTED ERROR encountered : " + err.stack);
            
            res.setHeader('Content-Type', 'application/json');
            res.status(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE);
            res.send(responseDataError);
        }
    });
}

/*
Author: Premkumar
Description : User Story 2 - As a teacher, I want to retrieve a list of students common to a given list of teachers
HTTP Method : GET
*/
exports.retrieveStudentsCommonToTeachers = (api) => {
    const functionName = "retrieveStudentsCommonToTeachers";

    api.get('/api/commonstudents', function(req, res) {
        try{
            const requestBody = req.body;
            const requestParam = req.query;

            loggingUtils.debug(className, functionName, "Request Body : " + JSON.stringify(requestBody));
            loggingUtils.debug(className, functionName, "Request Params : " + JSON.stringify(requestParam));

            const requestParamTeacher = req.query.teacher;

            let responseData = apiValidators.validateRetrieveStudentsCommonToTeachers(requestParamTeacher);

            if(responseData.isSuccess){
                // Retrieve Student emails common to provided Teacher email, from DB.
                responseData = apiService.retrieveStudentsCommonToTeachers(requestParamTeacher);
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(responseData.code);

            var finalRespData = null;
            if(responseData.isSuccess){
                finalRespData = {
                    students: commonUtils.retrieveStudentEmailListFromStudents(responseData.message)
                };
            }else{
                finalRespData = responseData;
            }

            res.send(finalRespData);

        }catch(err){
            let responseDataError = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, "UNEXPECTED ERROR encountered : " + err, [], false);
            loggingUtils.error(className, functionName, errorCodeConstants.EXCEPTION_ERROR_CODE_ERR0001, "UNEXPECTED ERROR encountered : " + err.stack);
            
            res.setHeader('Content-Type', 'application/json');
            res.status(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE);
            res.send(responseDataError);
        }
    });
}

/*
Author: Premkumar
Description : User Story 3 - As a teacher, I want to suspend a specific student.
HTTP Method : POST
*/
exports.suspendStudent = (api) => {
    const functionName = "suspendStudent";

    api.post('/api/suspend', function(req, res) {
        try{
            const requestBody = req.body;
            const requestParam = req.query;
            
            loggingUtils.debug(className, functionName, "Request Body : " + JSON.stringify(requestBody));
            loggingUtils.debug(className, functionName, "Request Params : " + JSON.stringify(requestParam));

            let responseData = apiValidators.validateSuspendStudent(requestBody);

            if(responseData.isSuccess){
                // Update Student record's status in DB to suspend.
                responseData = apiService.suspendStudent(requestBody);
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(responseData.code);
            res.send(responseData);
        }catch(err){
            let responseDataError = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, "UNEXPECTED ERROR encountered : " + err, [], false);
            loggingUtils.error(className, functionName, errorCodeConstants.EXCEPTION_ERROR_CODE_ERR0001, "UNEXPECTED ERROR encountered : " + err.stack);
            
            res.setHeader('Content-Type', 'application/json');
            res.status(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE);
            res.send(responseDataError);
        }
    });
    
}

/*
Author: Premkumar
Description : User Story 4 - As a teacher, I want to retrieve a list of students who can receive a given notification.
HTTP Method : POST
*/
exports.retrieveStudentsForNotifications = (api) => {
    const functionName = "retrieveStudentsForNotifications";

    api.post('/api/retrievefornotifications', function(req, res) {
        try{
            const requestBody = req.body;
            const requestParam = req.query;
            
            loggingUtils.debug(className, functionName, "Request Body : " + JSON.stringify(requestBody));
            loggingUtils.debug(className, functionName, "Request Params : " + JSON.stringify(requestParam));

            let responseData = apiValidators.validateRetrieveStudentsForNotifications(requestBody);

            // Sniff out list of student emails from notification meaasage and validate them.
            var notificationEmailList = commonUtils.retrieveStudentsFromNotification(requestBody.notification);
            apiValidators.validateNotificationEmailList(notificationEmailList, responseData);


            if(responseData.isSuccess){
                // Retrieve list of students (both from DB and email notification) for notifications.
                responseData = apiService.retrieveStudentsForNotifications(requestBody.teacher, notificationEmailList);
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(responseData.code);
            
            var finalRespData = null;
            if(responseData.isSuccess){
                finalRespData = {
                    recipients: responseData.message
                };
            }else{
                finalRespData = responseData;
            }

            res.send(finalRespData);

        }catch(err){
            let responseDataError = new responseModel(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE, "UNEXPECTED ERROR encountered : " + err, [], false);
            loggingUtils.error(className, functionName, errorCodeConstants.EXCEPTION_ERROR_CODE_ERR0001, "UNEXPECTED ERROR encountered : " + err.stack);
            
            res.setHeader('Content-Type', 'application/json');
            res.status(responseCodeConstants.HTTP_RESP_INTERNAL_SERVER_ERROR_CODE);
            res.send(responseDataError);
        }
    });
}