
var loggingUtils = require('./src/main/utils/LoggingUtils');

//Initialise and Test DB Connection
var dbTest = require('./src/test/config/DBConfigTest');
dbTest.testDBConnection();

// Initialse API Config
var controllerConfig = require('./src/main/config/ControllerConfig');

// Initialise API Interface Port Usage
var PORT = 8081;
controllerConfig.listen(PORT, function() {
    loggingUtils.debug("Index", "default", 'Server is running on PORT: ' + PORT);
});
