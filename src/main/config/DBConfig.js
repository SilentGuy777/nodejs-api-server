/*
    Author: Premkumar
    Description: Contains the Database (DB) confiuration and initialisation.
*/

// DB Config for Datasource ======================================
/* Synchronous DB Config */
const mysql = require('sync-mysql'); 

module.exports = function(){
    const connection = new mysql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'nodejsdb'
      });

    return connection;
}
