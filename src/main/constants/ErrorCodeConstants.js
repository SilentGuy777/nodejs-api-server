const errorCodeConstants = {
    // DB Error Codes =============================================

    // DB Table - Students
    DB_STUDENTS_SEARCHSTUDENTS_ERROR_CODE_DB0001: 'DB0001',
    DB_STUDENTS_SEARCHTEACHERSTUDENT_ERROR_CODE_DB0002: 'DB0002',
    DB_STUDENTS_UPDATESTUDENTTEACHERS_ERROR_CODE_DB0003: 'DB0003',
    DB_STUDENTS_ADDSTUDENT_ERROR_CODE_DB0004: 'DB0004',
    DB_STUDENTS_RETRIEVESTUDENTSCOMMONTOTEACHERS_ERROR_CODE_DB0005: 'DB0005',
    DB_STUDENTS_UPDATESTUDENTSTATUS_ERROR_CODE_DB0006: 'DB0006',

    // DB Table - Teachers
    DB_TEACHERS_SEARCHTEACHER_ERROR_CODE_DB1001: 'DB1001',
    DB_TEACHERS_ADDTEACHER_ERROR_CODE_DB0002: 'DB1002',


    // Service Error Codes =============================================

    // StudentService
    STUDENTS_SERVICE_ADDSTUDENTRECORD_ERROR_CODE_SVC0001: 'SVC0001',
    STUDENTS_SERVICE_UPDATESTUDENTTEACHERS_ERROR_CODE_SVC0002: 'SVC0002',
    STUDENTS_SERVICE_RETRIEVESTUDENTSCOMMONTOTEACHERS_ERROR_CODE_SVC0003: 'SVC0003',
    STUDENTS_SERVICE_SUSPENDSTUDENT_ERROR_CODE_SVC0004: 'SVC0004',
    STUDENTS_SERVICE_RETRIEVESTUDENTSUNDERTEACHER_ERROR_CODE_SVC0005: 'SVC0005',
    STUDENTS_SERVICE_CHECKSTUDENTSFROMNOTIFICATION_ERROR_CODE_SVC0006: 'SVC0006',

    // TeacherService
    TEACHER_SERVICE_ADDTEACHERRECORD_ERROR_CODE_SVC1001: 'SVC1001',
    

    // Exception Error Codes =============================================
    EXCEPTION_ERROR_CODE_ERR0001: 'ERR0001'

};

module.exports = errorCodeConstants;