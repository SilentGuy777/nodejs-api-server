const supertest = require('supertest');
const req = require('express/lib/request');
const { text } = require('express');

const createRequester = () => {
    // Reload ControllerConfig module after mocks are defined
    const controllerConfig = require('../../main/config/ControllerConfig');
    return supertest(controllerConfig);
};

describe('TEST ApiControlller API Endpoints', () => {
    // Reset and clear mocks and modules before unit test function executes.
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.clearAllMocks());

    // =====================================================================
    // 1. TEST API endpoint : registerStudents 
    // =====================================================================
    it('1.a TEST registerStudents API Endpoint FAIL Response : 400', async () => {

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.post('/api/register')
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                req.method = "POST";
                text.code = 400;
                text.isSuccess = false;
            });
    });

    it('1.b TEST registerStudents API Endpoint SUCCESS Response : 204', async () => {
        var mockReqBody = {
            teacher: "testing@gmail.com",
            students: ["studentone@gmail.com", "studenttwo@gmail.com"]
        };

        var mockRespBody = {
            code: 204,
            message: "testing",
            isSuccess: true
        };

        // Mock ApiService.regitserStudentsService response data.
        jest.doMock('../../main/service/ApiService', () => {
            return {
                registerStudentsService: () => {
                    return mockRespBody;
                }
            };
        });

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.post('/api/register')
            .send(mockReqBody)
            .expect(204)
            .expect((res) => {
                req.method = "POST";
                text.code = 204;
                text.isSuccess = true;
            });
    });

    // =====================================================================
    // 2. TEST API endpoint : retrieveStudentsCommonToTeachers 
    // =====================================================================
    it('2.a TEST retrieveStudentsCommonToTeachers API Endpoint FAIL Response : 400', async () => {

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.get('/api/commonstudents')
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                req.method = "GET";
                text.code = 400;
                text.isSuccess = false;
            });
    });

    it('2.b TEST retrieveStudentsCommonToTeachers API Endpoint SUCCESS Response : 200', async () => {
        var mockReqParam = {
            teacher: "teacher@gmail.com"
        };

        var mockRespBody = {
            code: 200,
            message: ["student@gmail.com"],
            isSuccess: true
        };

        // Mock ApiService.retrieveStudentsCommonToTeachers response data.
        jest.doMock('../../main/service/ApiService', () => {
            return {
                retrieveStudentsCommonToTeachers: () => {
                    return mockRespBody;
                }
            };
        });

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.get('/api/commonstudents')
            .query(mockReqParam)
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                req.method = "GET";
                req.students = ["student@gmail.com"];
            });
    });

    // =====================================================================
    // 3. TEST API endpoint : suspendStudent 
    // =====================================================================
    it('3.a TEST suspendStudent API Endpoint FAIL Response : 400', async () => {

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.post('/api/suspend')
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                req.method = "POST";
                text.code = 400;
                text.isSuccess = false;
            });
    });

    it('3.b TEST suspendStudent API Endpoint SUCCESS Response : 204', async () => {
        var mockReqParam = {
            student: "student@gmail.com"
        };

        var mockRespBody = {
            code: 204,
            message: "testing",
            isSuccess: true
        };

        // Mock ApiService.suspendStudent response data.
        jest.doMock('../../main/service/ApiService', () => {
            return {
                suspendStudent: () => {
                    return mockRespBody;
                }
            };
        });

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.post('/api/suspend')
            .send(mockReqParam)
            .expect(204)
            .expect((res) => {
                req.method = "POST";
                text.code = 204;
                text.isSuccess = true;
            });
    });

    // =====================================================================
    // 4. TEST API endpoint : retrieveStudentsForNotifications 
    // =====================================================================
    it('4.a TEST retrieveStudentsForNotifications API Endpoint FAIL Response : 400', async () => {

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.post('/api/retrievefornotifications')
            .expect(400)
            .expect("Content-Type", /json/)
            .expect((res) => {
                req.method = "POST";
                text.code = 400;
                text.isSuccess = false;
            });
    });

    it('4.b TEST retrieveStudentsForNotifications API Endpoint SUCCESS Response : 200', async () => {
        var mockReqParam = {
            teacher: "teacher@gmail.com",
            notification: "Hello Students! @student@gmail.com"
        };

        var mockRespBody = {
            code: 200,
            message: ["student@gmail.com"],
            isSuccess: true
        };

        // Mock ApiService.suspendStudent response data.
        jest.doMock('../../main/service/ApiService', () => {
            return {
                retrieveStudentsForNotifications: () => {
                    return mockRespBody;
                }
            };
        });

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.post('/api/retrievefornotifications')
            .send(mockReqParam)
            .expect(200)
            .expect((res) => {
                req.method = "POST";
                text.code = 200;
                text.isSuccess = true;
                req.recipients = ["student@gmail.com"];
            });
    });

})