var studentService = require('../../main/service/StudentService');
var studentRepo = require('../../main/repo/StudentRepo');
var responseModel = require('../../main/model/response/ResponseModel');

describe('TEST StudentService', () => {
    // Reset and clear mocks and modules before unit test function executes.
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.clearAllMocks());

    // 1. TEST addStudentRecord ===================================================
    it('1.a TEST addStudentRecord FAIL Scenario', () => {
        const mockRespData = new responseModel(500, 'Test Fail Scenario', ["Test Fail Scenario"], false);
            
        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespData);

        const teacher = "testing@gmail.com";
        const student = "123@gmail.com";
        var addedRecords = [];
        var skippedRecords = [];
        var updatedRecords = [];
        var errors = [];

        studentService.addStudentRecord(teacher, student, addedRecords, skippedRecords, updatedRecords, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(1);
        expect(errors).toContain("ERROR adding Student record (123@gmail.com) : Test Fail Scenario");
    });

    it('1.b TEST addStudentRecord SUCCESS Scenario', () => {
        const mockRespData = new responseModel(200, [], [], true);

        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespData);
        studentRepo.addStudent = jest.fn().mockReturnValue(mockRespData);

        const teacher = "testing@gmail.com";
        const student = "123@gmail.com";
        var addedRecords = [];
        var skippedRecords = [];
        var updatedRecords = [];
        var errors = [];

        studentService.addStudentRecord(teacher, student, addedRecords, skippedRecords, updatedRecords, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(0);
        expect(addedRecords).toHaveLength(1);
        expect(addedRecords).toContain("Student record (123@gmail.com) added successfully.");
    });


    // 2. TEST updateStudentTeachers ===================================================
    it('2.a TEST updateStudentTeachers FAIL Scenario', () => {
        const mockRespData = new responseModel(500, 'Test Fail Scenario', ["Test Fail Scenario"], false);
            
        studentRepo.searchTeacherStudent = jest.fn().mockReturnValue(mockRespData);

        const teacher = "testing@gmail.com";
        const student = "123@gmail.com";
        var skippedRecords = [];
        var updatedRecords = [];
        var errors = [];
        var teachers = "teacherone@gmail.com";

        studentService.updateStudentTeachers(teacher, student, skippedRecords, updatedRecords, errors, teachers);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(1);
        expect(errors).toContain("ERROR adding Student record (123@gmail.com) : Test Fail Scenario");
    });

    it('2.b TEST updateStudentTeachers SUCCESS Scenario', () => {
        const mockRespData = new responseModel(200, [], [], true);

        studentRepo.searchTeacherStudent = jest.fn().mockReturnValue(mockRespData);
        studentRepo.updateStudentTeachers = jest.fn().mockReturnValue(mockRespData);

        const teacher = "testing@gmail.com";
        const student = "123@gmail.com";
        var skippedRecords = [];
        var updatedRecords = [];
        var errors = [];
        var teachers = "teacherone@gmail.com";

        //var teacherList = commonUtils.addTeacherToTeacherList(teachers, teacher);

        studentService.updateStudentTeachers(teacher, student, skippedRecords, updatedRecords, errors, teachers);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(0);
        expect(updatedRecords).toHaveLength(1);
        expect(updatedRecords).toContain("Student record (123@gmail.com) updated successfully.");
    });

    // 3. TEST retrieveStudentsCommonToTeachers ===================================================
    it('3.a TEST retrieveStudentsCommonToTeachers FAIL Scenario', () => {
        const mockRespData = new responseModel(500, 'Test Fail Scenario', ["Test Fail Scenario"], false);

        studentRepo.retrieveStudentsCommonToTeachers = jest.fn().mockReturnValue(mockRespData);
        
        var requestData = "teacherone@gmail.com";

        const response = studentService.retrieveStudentsCommonToTeachers(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(500);
        expect(response.isSuccess).toBe(false);
    });

    it('3.b TEST retrieveStudentsCommonToTeachers SUCCESS Scenario', () => {
        const mockRespData = new responseModel(200, [], [], true);
        
        studentRepo.retrieveStudentsCommonToTeachers = jest.fn().mockReturnValue(mockRespData);
        
        var requestData = "teacherone@gmail.com";

        const response = studentService.retrieveStudentsCommonToTeachers(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });

    // 4. TEST suspendStudent ===================================================
    it('4.a TEST suspendStudent FAIL Scenario', () => {
        const mockRespData = new responseModel(500, 'Test Fail Scenario', ["Test Fail Scenario"], false);
            
        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespData);

        const student = "123@gmail.com";
        var updatedRecords = [];
        var errors = [];

        studentService.suspendStudent(student, updatedRecords, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(1);
        expect(errors).toContain("ERROR suspending Student record (123@gmail.com) : Test Fail Scenario");
    });

    it('4.b TEST suspendStudent SUCCESS Scenario', () => {
        const studentRecord = {
            email: "studentone@gmail.com",
            teachers: "teacherone@gmail.com",
            status: "active"
        };

        const mockRespDataQuery = new responseModel(200, [studentRecord], [], true);
        const mockRespData = new responseModel(200, [], [], true);

        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespDataQuery);
        studentRepo.updateStudentStatus = jest.fn().mockReturnValue(mockRespData);

        const student = "123@gmail.com";
        var updatedRecords = [];
        var errors = [];

        studentService.suspendStudent(student, updatedRecords, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(0);
        expect(updatedRecords).toHaveLength(1);
        expect(updatedRecords).toContain("Student record (123@gmail.com) suspended successfully.");
    });


    // 5. TEST retrieveStudentsUnderTeacher ===================================================
    it('5.a TEST retrieveStudentsUnderTeacher FAIL Scenario', () => {
        const mockRespData = new responseModel(500, 'Test Fail Scenario', ["Test Fail Scenario"], false);

        studentRepo.retrieveStudentsCommonToTeachers = jest.fn().mockReturnValue(mockRespData);

        const teacher = "teacherone@gmail.com";
        var fetchedEmailList = [];
        var errors = [];

        studentService.retrieveStudentsUnderTeacher(teacher, fetchedEmailList, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(1);
        expect(errors).toContain("ERROR retrieving Students under teacher(teacherone@gmail.com) : Test Fail Scenario");
    });

    it('5.b TEST retrieveStudentsUnderTeacher SUCCESS Scenario', () => {
        const studentRecord = {
            email: "studentone@gmail.com",
            teachers: "teacherone@gmail.com",
            status: "active"
        };

        const mockRespDataQuery = new responseModel(200, [studentRecord], [], true);
        
        studentRepo.retrieveStudentsCommonToTeachers = jest.fn().mockReturnValue(mockRespDataQuery);

        const teacher = "teacherone@gmail.com";
        var fetchedEmailList = [];
        var errors = [];

        studentService.retrieveStudentsUnderTeacher(teacher, fetchedEmailList, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(0);
        expect(fetchedEmailList).toHaveLength(1);
        expect(fetchedEmailList).toContain("studentone@gmail.com");
    });
    

    // 6. TEST checkStudentsFromNotification ===================================================
    it('6.a TEST checkStudentsFromNotification FAIL Scenario', () => {
        const mockRespData = new responseModel(500, 'Test Fail Scenario', ["Test Fail Scenario"], false);

        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespData);

        const notificationEmailList = ["studentone@gmail.com"];
        var fetchedEmailList = [];
        var errors = [];

        studentService.checkStudentsFromNotification(notificationEmailList, fetchedEmailList, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(1);
        expect(errors).toContain("ERROR retrieving Student record (studentone@gmail.com) : Test Fail Scenario");
    });

    it('6.b TEST checkStudentsFromNotification SUCCESS Scenario', () => {
        const studentRecord = {
            email: "studentone@gmail.com",
            teachers: "teacherone@gmail.com",
            status: "active"
        };

        const mockRespDataQuery = new responseModel(200, [studentRecord], [], true);
        
        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespDataQuery);

        const notificationEmailList = ["studentone@gmail.com"];
        var fetchedEmailList = [];
        var errors = [];

        studentService.checkStudentsFromNotification(notificationEmailList, fetchedEmailList, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(0);
        expect(fetchedEmailList).toHaveLength(1);
        expect(fetchedEmailList).toContain("studentone@gmail.com");
    });
})