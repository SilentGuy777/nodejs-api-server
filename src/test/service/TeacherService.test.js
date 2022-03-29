var teacherService = require('../../main/service/TeacherService');
var teacherRepo = require('../../main/repo/TeacherRepo');
var responseModel = require('../../main/model/response/ResponseModel');

describe('TEST TeacherService', () => {
    // Reset and clear mocks and modules before unit test function executes.
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.clearAllMocks());

    // 1. TEST addTeacherRecord ===================================================
    it('1.a TEST addTeacherRecord FAIL Scenario', () => {
        const mockRespData = new responseModel(400, 'Test Fail Scenario', ["Test Fail Scenario"], false);
            
        teacherRepo.searchTeacher = jest.fn().mockReturnValue(mockRespData);
        
        const teacher = "testing@gmail.com";
        var addedRecords = [];
        var skippedRecords = [];
        var errors = [];

        const response = teacherService.addTeacherRecord(teacher, addedRecords, skippedRecords, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(1);
        expect(errors).toContain("ERROR adding Teacher record (testing@gmail.com) : Test Fail Scenario");
    });

    it('1.b TEST addTeacherRecord SUCCESS Scenario', () => {
        const mockRespData = new responseModel(200, [], [], true);

        teacherRepo.searchTeacher = jest.fn().mockReturnValue(mockRespData);       
        teacherRepo.addTeacher = jest.fn().mockReturnValue(mockRespData);

        const teacher = "testing@gmail.com";
        var addedRecords = [];
        var skippedRecords = [];
        var errors = [];

        const response = teacherService.addTeacherRecord(teacher, addedRecords, skippedRecords, errors);
        console.log("Errors : " + JSON.stringify(errors));

        expect(errors).toHaveLength(0);
        expect(addedRecords).toHaveLength(1);
        expect(addedRecords).toContain("Teacher record (testing@gmail.com) added successfully.");
    });

})