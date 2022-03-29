/*
    Author: Premkumar
    Description: Contains the utility functions that can be utilised across the project directories.
*/

const responseCodeConstants = require('../constants/ResponseCodeConstants');
var responseModel = require('../model/response/ResponseModel');


// Generates the response object for validator functions.
exports.generateApiValidationResp = (errors) => {
    // Return Validation Outcome accordingly.
    var responseData = null;
    if(errors && errors.length > 0){
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_BAD_REQUEST_CODE, 'Data Validation Failed.', errors, false);
    }else{
        responseData = new responseModel(responseCodeConstants.HTTP_RESP_SUCCESS_CODE, '', errors, true);
    }

    return responseData;
}

// To add teacher email to new / existing teacher email list.
exports.addTeacherToTeacherList = (teachers, teacher) => {
    var teacherList = teachers.split(',');

    if(Array.isArray(teacherList)){
        teacherList.push(teacher);
        return teacherList.join(',');
    }else{
        var emailList = [];
        emailList.push(teacherList);
        emailList.push(teacher);
        return emailList.join(',');
    }
}

// To sniff out the student emails from notification content.
exports.retrieveStudentsFromNotification = (notification) => {
    var studentList = [];
    var pattern = new RegExp('@([a-zA-Z0-9\_\.]+)', 'gim');

    if(notification){
        var students = notification.match(pattern);

        if(students && Array.isArray(students) && students.length > 0){
            for(let i = 0; i < students.length; i++){
                if(i % 2 != 0){
                    var student = students[i-1].concat(students[i]);
                    studentList.push(student.substring(1));
                }
            }
        }
    }

    return studentList;
}

exports.retrieveStudentEmailListFromStudents = (students) => {
    var emailList = [];

    if(students && Array.isArray(students) && students.length > 0){
        students.forEach((student) =>{
            if(student && student.email){
                emailList.push(student.email);
            }
        });
    }

    return emailList;
}