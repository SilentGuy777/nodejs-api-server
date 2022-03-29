const supertest = require('supertest');
const req = require('express/lib/request');
const { text } = require('express');

const createRequester = () => {
    // Reload ControllerConfig module after mocks are defined
    const controllerConfig = require('../../main/config/ControllerConfig');
    return supertest(controllerConfig);
};

describe('TEST BaseControlller API Endpoints', () => {
    // Reset and clear mocks and modules before unit test function executes.
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.clearAllMocks());

    // =====================================================================
    // 1. TEST API endpoint : test 
    // =====================================================================
    it('1.a TEST test API Endpoint SUCCESS Response : 200', async () => {

        // Create requester after mock is defined
        const requester = createRequester();
        const response = await requester.get('/')
            .expect(200)
            .expect("Content-Type", /text/)
            .expect((res) => {
                req.method = "GET";
                text.text = "Hello world";
            });
    });

})