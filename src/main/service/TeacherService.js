/*
    Author: Premkumar
    Description: Student Service that handles the business & processing logics for requests related to Teachers and Teachers DB transactions.
*/

var teacherRepo = require('../repo/TeacherRepo');
const loggingUtils = require('../utils/LoggingUtils');
const errorCodeConstants = require('../constants/ErrorCodeConstants');
const className = "TeacherService";

// Service that handles business and processing logics for adding Teacher Record to DB.
exports.addTeacherRecord = (teacher, addedRecords, skippedRecords, errors) => {
    const functionName = "addTeacherRecord";

    // Search DB table Teachers for any existing teacher record.
    var queryOutcome = teacherRepo.searchTeacher(teacher);

    if(queryOutcome && !queryOutcome.isSuccess){
        loggingUtils.error(className, functionName, errorCodeConstants.TEACHER_SERVICE_ADDTEACHERRECORD_ERROR_CODE_SVC1001, 
            "ERROR adding Teacher record (" + teacher + ") : " + queryOutcome.errors);
        errors.push("ERROR adding Teacher record (" + teacher + ") : " + queryOutcome.errors);
    }

    if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message.length > 0){
        loggingUtils.debug(className, functionName, "Teacher record (" + teacher + ") is already present in DB. Skipping INSERT...");
        skippedRecords.push("Teacher record (" + teacher + ") is already present in DB. Skipping INSERT...");
    }

    if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message.length <= 0){
        queryOutcome = teacherRepo.addTeacher(teacher);

        if(queryOutcome && queryOutcome.isSuccess){
            loggingUtils.debug(className, functionName, "Teacher record (" + teacher + ") added successfully.");
            addedRecords.push("Teacher record (" + teacher + ") added successfully.");
        }else{
            loggingUtils.error(className, functionName, errorCodeConstants.TEACHER_SERVICE_ADDTEACHERRECORD_ERROR_CODE_SVC1001, 
                "ERROR adding Teacher record (" + teacher + ") : " + queryOutcome.errors);
            errors.push("ERROR adding Teacher record (" + teacher + ") : " + queryOutcome.errors);
        }
    }
}