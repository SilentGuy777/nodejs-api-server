const apiService = require('../../main/service/ApiService');
var teacherService = require('../../main/service/TeacherService');
var studentService = require('../../main/service/StudentService');
var studentRepo = require('../../main/repo/StudentRepo');
var teacherRepo = require('../../main/repo/TeacherRepo');
var responseModel = require('../../main/model/response/ResponseModel');

describe('TEST ApiService', () => {
    // Reset and clear mocks and modules before unit test function executes.
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.clearAllMocks());

    // 1. TEST registerStudentsService ===================================================
    it('1.a TEST registerStudentsService FAIL Scenario', () => {
        const mockRespData = new responseModel(400, 'Test Fail Scenario', ["Test Fail Scenario"], false);
            
        teacherRepo.searchTeacher = jest.fn().mockReturnValue(mockRespData);
        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespData);
        
        var requestData = {
            teacher: "testing@gmail.com",
            students : ["123@gmail.com"]
        }

        const response = apiService.registerStudentsService(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('1.b TEST registerStudentsService SUCCESS Scenario', () => {
        const mockRespData = new responseModel(200, [], [], true);

        teacherRepo.searchTeacher = jest.fn().mockReturnValue(mockRespData);
        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespData);
        
        teacherRepo.addTeacher = jest.fn().mockReturnValue(mockRespData);
        studentRepo.addStudent = jest.fn().mockReturnValue(mockRespData);

        var requestData = {
            teacher: "testing@gmail.com",
            students : ["123@gmail.com"]
        }

        const response = apiService.registerStudentsService(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(204);
        expect(response.isSuccess).toBe(true);
    });

    it('1.c TEST registerStudentsService PARTIAL SUCCESS Scenario', () => {
        const mockRespDataSuccess = new responseModel(200, [], [], true);
        const mockRespDataError = new responseModel(400, 'Test Fail Scenario', ["Test Fail Scenario"], false);

        teacherRepo.searchTeacher = jest.fn().mockReturnValue(mockRespDataSuccess);
        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespDataError);

        teacherRepo.addTeacher = jest.fn().mockReturnValue(mockRespDataSuccess);
        
        var requestData = {
            teacher: "testing@gmail.com",
            students : ["123@gmail.com"]
        }

        const response = apiService.registerStudentsService(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(202);
        expect(response.isSuccess).toBe(true);
    });

    // 2. TEST retrieveStudentsCommonToTeachers ===================================================
    it('2.a TEST retrieveStudentsCommonToTeachers FAIL Scenario', () => {
        const mockRespData = new responseModel(400, 'Test Fail Scenario', ["Test Fail Scenario"], false);

        studentRepo.retrieveStudentsCommonToTeachers = jest.fn().mockReturnValue(mockRespData);
        
        var requestData = "teacherone@gmail.com";

        const response = apiService.retrieveStudentsCommonToTeachers(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('2.b TEST retrieveStudentsCommonToTeachers SUCCESS Scenario', () => {
        const mockRespData = new responseModel(200, [], [], true);
        
        studentRepo.retrieveStudentsCommonToTeachers = jest.fn().mockReturnValue(mockRespData);
        
        var requestData = "teacherone@gmail.com";

        const response = apiService.retrieveStudentsCommonToTeachers(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });

    // 3. TEST suspendStudent ===================================================
    it('3.a TEST suspendStudent FAIL Scenario', () => {
        const mockRespData = new responseModel(400, 'Test Fail Scenario', ["Test Fail Scenario"], false);
            
        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespData);
        
        var requestData = {
            student: "studentone@gmail.com"
        };

        const response = apiService.suspendStudent(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('3.b TEST suspendStudent SUCCESS Scenario', () => {
        const studentRecord = {
            email: "studentone@gmail.com",
            teachers: "teacherone@gmail.com",
            status: "active"
        };

        const mockRespDataQuery = new responseModel(200, [studentRecord], [], true);
        const mockRespData = new responseModel(200, [], [], true);

        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespDataQuery);
        studentRepo.updateStudentStatus = jest.fn().mockReturnValue(mockRespData);
        
        var requestData = {
            student: "studentone@gmail.com"
        };

        const response = apiService.suspendStudent(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(204);
        expect(response.isSuccess).toBe(true);
    });

    // 4. TEST retrieveStudentsForNotifications ===================================================
    it('4.a TEST retrieveStudentsForNotifications FAIL Scenario', () => {
        const teacher = "teacherone@gmail.com";
        const notificationEmailList = ["studentone@gmail.com", "studenttwo@gmail.com"];

        const mockRespData = new responseModel(400, 'Test Fail Scenario', ["Test Fail Scenario"], false);

        studentRepo.retrieveStudentsCommonToTeachers = jest.fn().mockReturnValue(mockRespData);

        const response = apiService.retrieveStudentsForNotifications(teacher, notificationEmailList);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('4.b TEST retrieveStudentsForNotifications SUCCESS Scenario', () => {
        const teacher = "teacherone@gmail.com";
        const notificationEmailList = ["studentone@gmail.com", "studenttwo@gmail.com"];
        const studentRecord = {
            email: "studentone@gmail.com",
            teachers: "teacherone@gmail.com",
            status: "active"
        };

        const mockRespDataQuery = new responseModel(200, [studentRecord], [], true);
        
        studentRepo.retrieveStudentsCommonToTeachers = jest.fn().mockReturnValue(mockRespDataQuery);
        studentRepo.searchStudent = jest.fn().mockReturnValue(mockRespDataQuery);

        const response = apiService.retrieveStudentsForNotifications(teacher, notificationEmailList);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });
})


