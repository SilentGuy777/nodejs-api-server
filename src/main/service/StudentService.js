/*
    Author: Premkumar
    Description: Student Service that handles the business & processing logics for requests related to Students and Students DB transactions.
*/

const studentRepo = require('../repo/StudentRepo');
const commonUtils = require('../utils/CommonUtils');
const studentConstants = require('../constants/StudentConstants');
const loggingUtils = require('../utils/LoggingUtils');
const errorCodeConstants = require('../constants/ErrorCodeConstants');
const className = "StudentService";

// Service that handles business and processing logics for adding Student Record to DB.
exports.addStudentRecord = (teacher, student, addedRecords, skippedRecords, updatedRecords, errors) => {
    const functionName = "addStudentRecord";

    // Search DB table Student for any existing student record.
    var queryOutcome = studentRepo.searchStudent(student);

    if(queryOutcome && !queryOutcome.isSuccess){
        loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_ADDSTUDENTRECORD_ERROR_CODE_SVC0001, 
            "ERROR adding Student record (" + student + ") : " + queryOutcome.errors);
        errors.push("ERROR adding Student record (" + student + ") : " + queryOutcome.errors);
    }

    // Update Student record with updated teacher list if existing student record found.
    if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message.length > 0){
        var teachers = null;
        if(Array.isArray(queryOutcome.message)){
            teachers = queryOutcome.message[0].teachers;
        }else{
            teachers = queryOutcome.message.teachers;
        }
        
        this.updateStudentTeachers(teacher, student, skippedRecords, updatedRecords, errors, teachers);
    }

    // Add Student record if student record not found.
    if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message.length <= 0){
        queryOutcome = studentRepo.addStudent(teacher, student);

        if(queryOutcome && queryOutcome.isSuccess){
            loggingUtils.debug(className, functionName, "Student record (" + student + ") added successfully.");
            addedRecords.push("Student record (" + student + ") added successfully.");
        }else{
            loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_ADDSTUDENTRECORD_ERROR_CODE_SVC0001, 
                "ERROR adding Student record (" + student + ") : " + queryOutcome.errors);
            errors.push("ERROR adding Student record (" + student + ") : " + queryOutcome.errors);
        }
    }
}

// Service that handles business and processing logics for updating Student Record with teacher's email listing to DB.
exports.updateStudentTeachers = (teacher, student, skippedRecords, updatedRecords, errors, teachers) => {
    const functionName = "updateStudentTeachers";

    // Search DB table Student table to check if student already resigterd under teacher.
    var queryOutcomeUpdate = studentRepo.searchTeacherStudent(teacher, student);

    if(queryOutcomeUpdate && !queryOutcomeUpdate.isSuccess){
        loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_UPDATESTUDENTTEACHERS_ERROR_CODE_SVC0002, 
            "ERROR adding Student record (" + student + ") : " + queryOutcomeUpdate.errors);
        errors.push("ERROR adding Student record (" + student + ") : " + queryOutcomeUpdate.errors);
    }

    if(queryOutcomeUpdate && queryOutcomeUpdate.isSuccess && queryOutcomeUpdate.message.length > 0){
        loggingUtils.debug(className, functionName, "Student record (" + student + ") is already registred to teacher (" + teacher + " ). Skipping UPDATE...");
        skippedRecords.push("Student record (" + student + ") is already registred to teacher (" + teacher + " ). Skipping UPDATE...");
    }

    if(queryOutcomeUpdate && queryOutcomeUpdate.isSuccess && queryOutcomeUpdate.message.length <= 0){
        loggingUtils.debug(className, functionName, "Existing Student record (" + student + ") found in DB. Proceed to UPDATE...");
        queryOutcomeUpdate = studentRepo.updateStudentTeachers(commonUtils.addTeacherToTeacherList(teachers, teacher), student);
        if(queryOutcomeUpdate && queryOutcomeUpdate.isSuccess){
            loggingUtils.debug(className, functionName, "Student record (" + student + ") updated successfully.");
            updatedRecords.push("Student record (" + student + ") updated successfully.");
        }else{
            loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_UPDATESTUDENTTEACHERS_ERROR_CODE_SVC0002, 
                "ERROR updating Student record (" + student + ") : " + queryOutcomeUpdate.errors);
            errors.push("ERROR updating Student record (" + student + ") : " + queryOutcomeUpdate.errors);
        }
    }
}

// Service that handles business and processing logics for retrieving students common / registered under given list of teachers.
exports.retrieveStudentsCommonToTeachers = (teachers) =>{
    const functionName = "retrieveStudentsCommonToTeachers";

    var teacherList = [];
    if(Array.isArray(teachers)){
        teacherList = teachers;
    }else{
        teacherList.push(teachers);
    }

    var queryOutcome = studentRepo.retrieveStudentsCommonToTeachers(teacherList);

    if(queryOutcome && !queryOutcome.isSuccess){
        loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_RETRIEVESTUDENTSCOMMONTOTEACHERS_ERROR_CODE_SVC0003, 
            "ERROR retrieving Student records common to teachers(" + teachers + ") : " + queryOutcome.errors);
    }

    if(queryOutcome && queryOutcome.isSuccess){
        loggingUtils.debug(className, functionName, "Student records common to teachers(" + teachers + ") retrieved successfully.");
        loggingUtils.debug(className, functionName, "Retrieved records : " + queryOutcome.message);
    }

    return queryOutcome;
}

// Service that handles business and processing logics for suspending student.
exports.suspendStudent = (student, updatedRecords, errors) =>{
    const functionName = "suspendStudent";
    var queryOutcome = studentRepo.searchStudent(student);

    if(queryOutcome && !queryOutcome.isSuccess){
        loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_SUSPENDSTUDENT_ERROR_CODE_SVC0004, 
            "ERROR suspending Student record (" + student + ") : " + queryOutcome.errors);
        errors.push("ERROR suspending Student record (" + student + ") : " + queryOutcome.errors);
    }

    if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message.length <= 0){
        loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_SUSPENDSTUDENT_ERROR_CODE_SVC0004, 
            "ERROR suspending Student record (" + student + ") : No records found.");
        errors.push("ERROR suspending Student record (" + student + ") : No records found.");
    }

    // For UPDATE Student's status in Students DB table.
    if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message.length > 0){
        loggingUtils.debug(className, functionName, "Existing Student record (" + student + ") found in DB. Proceed to UPDATE...");

        queryOutcome = studentRepo.updateStudentStatus(student, studentConstants.STUDENT_STATUS_SUSPEND);
        if(queryOutcome && queryOutcome.isSuccess){
            loggingUtils.debug(className, functionName, "Student record (" + student + ") suspended successfully.");
            updatedRecords.push("Student record (" + student + ") suspended successfully.");
        }else{
            loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_SUSPENDSTUDENT_ERROR_CODE_SVC0004, 
                "ERROR suspending Student record (" + student + ") : " + queryOutcome.errors);
            errors.push("ERROR suspending Student record (" + student + ") : " + queryOutcome.errors);
        }
    }
}

// Service that handles business and processing logics for retrieving list of students under teacher for notification.
exports.retrieveStudentsUnderTeacher = (teacher, fetchedEmailList, errors) => {
    const functionName = "retrieveStudentsUnderTeacher";

    var queryOutcome = this.retrieveStudentsCommonToTeachers(teacher);

    if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message){
        if(queryOutcome.message.length > 0){
            queryOutcome.message.forEach((record) => {
                if(record && record.status !== studentConstants.STUDENT_STATUS_SUSPEND && record.email){
                    fetchedEmailList.push(record.email);
                }
            });
        }else{
            errors.push("No students are registered under the provided teacher (" + teacher + ").");
            loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_RETRIEVESTUDENTSUNDERTEACHER_ERROR_CODE_SVC0005, 
                "ERROR : No students are registered under the provided teacher (" + teacher + ").");
        }
    }else{
        loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_RETRIEVESTUDENTSUNDERTEACHER_ERROR_CODE_SVC0005, 
            "ERROR retrieving Students under teacher(" + teacher + ") : " + queryOutcome.errors);
        errors.push("ERROR retrieving Students under teacher(" + teacher + ") : " + queryOutcome.errors);
    }
}

// Service that handles business and processing logics for checking if those student emails mentioned in notification exist in DB.
// If they exist, add to recipient list.
exports.checkStudentsFromNotification = (notificationEmailList, fetchedEmailList, errors) => {
    const functionName = "checkStudentsFromNotification";

    notificationEmailList.forEach((student) => {
        var queryOutcome = studentRepo.searchStudent(student);

        if(queryOutcome && !queryOutcome.isSuccess){
            loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_CHECKSTUDENTSFROMNOTIFICATION_ERROR_CODE_SVC0006, 
                "ERROR retrieving Student record (" + student + ") : " + queryOutcome.errors);
            errors.push("ERROR retrieving Student record (" + student + ") : " + queryOutcome.errors);
        }

        if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message.length <= 0){
            loggingUtils.error(className, functionName, errorCodeConstants.STUDENTS_SERVICE_CHECKSTUDENTSFROMNOTIFICATION_ERROR_CODE_SVC0006, 
                "ERROR retrieving Student record (" + student + ") : No records found.");
            errors.push("ERROR retrieving Student record (" + student + ") : No records found.");
        }

        // If Student record exists in DB, add to email List.
        if(queryOutcome && queryOutcome.isSuccess && queryOutcome.message.length > 0){
            var record = queryOutcome.message[0];

            if(record && record.status !== studentConstants.STUDENT_STATUS_SUSPEND && record.email){
                fetchedEmailList.push(student);
            }
        }
    });
}