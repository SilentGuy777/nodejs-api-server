var commonUtils = require('../../main/utils/CommonUtils');

describe('TEST CommonUtils', () => {
    // Reset and clear mocks and modules before unit test function executes.
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.clearAllMocks());

    // 1. TEST generateApiValidationResp ===================================================
    it('1.a TEST generateApiValidationResp For SUCCESS Response', () => {
        var requestData = [];

        const response = commonUtils.generateApiValidationResp(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });

    it('1.b TEST generateApiValidationResp For ERROR SUCCESS Scenario', () => {
        var requestData = ["An error occurred"];

        const response = commonUtils.generateApiValidationResp(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    // 2. TEST addTeacherToTeacherList ===================================================
    it('2. TEST addTeacherToTeacherList', () => {
        var teachers = "teacherone@gmail.com,teachertwo@gmail.com";
        var teacher = "teacherthree@gmail.com";

        const response = commonUtils.addTeacherToTeacherList(teachers, teacher);
        console.log("Response : " + JSON.stringify(response));

        expect(response).toContain(",");
        expect(response).toContain("teacherone@gmail.com");
        expect(response).toContain("teacherthree@gmail.com");
        expect(response).toBe("teacherone@gmail.com,teachertwo@gmail.com,teacherthree@gmail.com");
    });

    // 3. TEST retrieveStudentsFromNotification ===================================================
    it('3. TEST retrieveStudentsFromNotification', () => {
        var notification = "Hello Students! @studentone@gmail.com @studenttwo@gmail.com";

        const response = commonUtils.retrieveStudentsFromNotification(notification);
        console.log("Response : " + JSON.stringify(response));

        expect(Array.isArray(response)).toBe(true);
        expect(response).toContain("studentone@gmail.com");
        expect(response).toContain("studenttwo@gmail.com");
    });

    // 4. TEST retrieveStudentEmailListFromStudents ===================================================
    it('4. TEST retrieveStudentEmailListFromStudents', () => {
        var students = [{
            email: "studentone@gmail.com",
            teachers: "teacherone@gmail.com, teachertwo@gmail.com",
            status: "active"
        },
        {
            email: "studenttwo@gmail.com",
            teachers: "teacherone@gmail.com, teachertwo@gmail.com",
            status: "active"
        }]

        const response = commonUtils.retrieveStudentEmailListFromStudents(students);
        console.log("Response : " + JSON.stringify(response));

        expect(Array.isArray(response)).toBe(true);
        expect(response).toContain("studentone@gmail.com");
        expect(response).toContain("studenttwo@gmail.com");
    });
})