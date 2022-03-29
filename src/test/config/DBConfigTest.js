var datasource = require('../../main/config/DBConfig')();
const loggingUtils = require('../../main/utils/LoggingUtils');

const className = "DBConfigTest";

exports.testDBConnection = () => {
    const functionName = "testDBConnection";
    
    var test = datasource.query('SELECT NOW()');

    if(test){
        loggingUtils.debug(className, functionName, test);
        loggingUtils.debug(className, functionName, 'Connected to MySQL DB Server!')
    }
}