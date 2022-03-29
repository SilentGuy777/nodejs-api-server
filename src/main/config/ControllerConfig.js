/*
    Author: Premkumar
    Description: Contains the Route / Controller / API endpoint configuration and initialisation.
*/

// Initialise Express Config for API Interface
var api = require('./ExpressConfig')();

// Base Controller Export (request path : /)
const BaseController = require('../controller/BaseController');
BaseController.test(api);

// Api Controller Exports (request path : /api)
const ApiController= require('../controller/ApiController');
ApiController.registerStudents(api);                  // RegisterStudents
ApiController.retrieveStudentsCommonToTeachers(api);  // Retrieve Students Common To Teachers
ApiController.suspendStudent(api);                    // Suspend Specific student.
ApiController.retrieveStudentsForNotifications(api);  // Retrieve Students Who Can Receive Notification

module.exports = api;