var commonValidators = require('../../main/validators/CommonValidators');

describe('TEST CommonValidators', () => {
    // Reset and clear mocks and modules before unit test function executes.
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.clearAllMocks());

    // 1. TEST checkIfDataIsEmailAddr ===================================================
    it('1.a TEST checkIfDataIsEmailAddr FAIL Scenario', () => {
        var requestData = "";

        const response = commonValidators.checkIfDataIsEmailAddr(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response).toBe(false);
    });

    it('1.b TEST checkIfDataIsEmailAddr SUCCESS Scenario', () => {
        var requestData = "testing@gmail.com";

        const response = commonValidators.checkIfDataIsEmailAddr(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response).toBe(true);
    });

    // 2. TEST checkIfEmptyOrSpaces ===================================================
    it('2.a TEST checkIfEmptyOrSpaces FAIL Scenario', () => {
        var requestData = "";

        const response = commonValidators.checkIfEmptyOrSpaces(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response).toBe(true);
    });

    it('2.b TEST checkIfEmptyOrSpaces SUCCESS Scenario', () => {
        var requestData = "testing@gmail.com";

        const response = commonValidators.checkIfEmptyOrSpaces(requestData);
        console.log("Response : " + JSON.stringify(response));

        expect(response).toBe(false);
    });
})