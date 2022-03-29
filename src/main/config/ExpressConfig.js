/*
    Author: Premkumar
    Description: Contains the API Interface hosting configuration and initialisation.
*/

// Express Config for hosting api endpoints ======================================
var express = require('express');

const className = "ExpressConfig";

module.exports = function(){
    var app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app;
}