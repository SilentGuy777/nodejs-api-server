/*
    Author: Premkumar
    Description: Hosts the list of APIs endpoints starting with path : /
*/

const responseCodeConstants = require('../constants/ResponseCodeConstants');
const className = "BaseController";

/*
Author: Premkumar
Description : For testing purpose
HTTP Method : POST
*/
exports.test = (api) => {
    api.get('/', function(req, res) {
        res.status(responseCodeConstants.HTTP_RESP_SUCCESS_CODE).send('Hello world');
      });
}