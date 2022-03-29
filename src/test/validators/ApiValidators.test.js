var apiValidators = require('../../main/validators/ApiValidators');

describe('TEST ApiValidators', () => {
    // Reset and clear mocks and modules before unit test function executes.
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.clearAllMocks());

    // 1. TEST validateRegisterStudent ===================================================
    it('1.a TEST validateRegisterStudent FAIL Scenario', () => {
        var requestData = {
            teacher: "",
            students : ""
        }

        const response = apiValidators.validateRegisterStudent(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('1.b TEST validateRegisterStudent SUCCESS Scenario', () => {
        var requestData = {
            teacher: "testing@gmail.com",
            students : ["123@gmail.com"]
        }

        const response = apiValidators.validateRegisterStudent(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });

    // 2. TEST validateRetrieveStudentsCommonToTeachers ===================================================
    it('2.a TEST validateRetrieveStudentsCommonToTeachers FAIL Scenario', () => {
        var requestData = "";

        const response = apiValidators.validateRetrieveStudentsCommonToTeachers(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('2.b TEST validateRetrieveStudentsCommonToTeachers SUCCESS Scenario', () => {
        var requestData = ["teacherone@gmail.com", "teachertwo@gmail.com"];

        const response = apiValidators.validateRetrieveStudentsCommonToTeachers(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });

    // 3. TEST validateSuspendStudent ===================================================
    it('3.a TEST validateSuspendStudent FAIL Scenario', () => {
        var requestData = {
            student: ""
        };

        const response = apiValidators.validateSuspendStudent(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('3.b TEST validateSuspendStudent SUCCESS Scenario', () => {
        var requestData = {
            student: "student@gmail.com"
        }

        const response = apiValidators.validateSuspendStudent(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });

    // 4. TEST validateRetrieveStudentsForNotifications ===================================================
    it('4.a TEST validateRetrieveStudentsForNotifications FAIL Scenario', () => {
        var requestData = {
            teacher: "",
            notification: ""
        };

        const response = apiValidators.validateRetrieveStudentsForNotifications(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('4.b TEST validateRetrieveStudentsForNotifications SUCCESS Scenario', () => {
        var requestData = {
            teacher: "teacher@gmail.com",
            notification: "Hello Students! @student@gmail.com"
        }

        const response = apiValidators.validateRetrieveStudentsForNotifications(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });

    // 5. TEST validateNotificationEmailList ===================================================
    it('5.a TEST validateNotificationEmailList FAIL Scenario', () => {
        var emailList = ["", ""];
        var respData = {
            code: 200,
            isSuccess: true,
            message: "success",
            errors: []
        };

        const response = apiValidators.validateNotificationEmailList(emailList, respData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(400);
        expect(response.isSuccess).toBe(false);
    });

    it('5.b TEST validateNotificationEmailList SUCCESS Scenario', () => {
        var emailList = ["studentone@gmail.com", "studenttwo@gmail.com"];
        var respData = {
            code: 200,
            isSuccess: true,
            message: "success",
            errors: []
        };

        const response = apiValidators.validateNotificationEmailList(emailList, respData);
        console.log("Response : " + JSON.stringify(response));

        expect(response.code).toBe(200);
        expect(response.isSuccess).toBe(true);
    });


})