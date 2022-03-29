# NodeJS API Assessment
Below describes the implementation of NodeJS backend server implementation for the NodeJS API Assessment. 

## 1. Objective / Background
Teachers need a system where they can perform administrative functions for their students.
Teachers and students are identified by their email addresses.

Therefore a backend system is being implemented that exposes APIs (Application Programming Interface) that allows the Teachers to perform their required administrative functions.

## 2. Framework / Technologies used
NodeJS with Javascript is being used for this backend server implementation.

Modules imported in NodeJS:

|Module Name|Usage Description|Command|
|:---|:---|:---|
|express|For API Implementation|npm install express --save|                
|email-validator|To validate email address|npm install email-validator --save|
|sync-mysql|Synchronous MySQL DB query Implementation|npm install sync-mysql --save|
|jest|Used for unit testing|npm install --save-dev jest|
|supertest|Used with Jest for unit testing of APIs|npm install --save-dev supertest|

For Database implementation, MySQL Database is used.

## 3. Assumptions
Assume that login and access control have already been handled.

## 4. Project Structure and Design
The project structure is defined as follows:
```
- src
  - main
    - config
    - constants
    - controller
    - model
    - repo
    - service
    - utils
    - validators
  - test
- index.js
- package.json
```

Below details the description of the structure and directories:
|Directory Path|Description|
|:---|:---|
|index.js|Handles the server startup and testing of DB connection and API port listening.|
|package.json|Manifest file of NodeJS server project. Contains the metadata of the project.|
|src|Contains all the source codes for the application.|
|src/main|Contains the main source codes for handling API, DB transactions and business logics.|
|src/main/config|Contains required configurations required for application (e.g. DB config, API (express) config).|
|src/main/constants|Contains the constant values that can be used for this application.|
|src/main/controller|API endpoint implementation and its exposure is declared here.|
|src/main/model|Common data structure objects are declared here.|
|src/main/repo|DB query handling logics are declared here.|
|src/main/service|Business logics and information processing logics are declared here.|
|src/main/utils|Common utility functions that can be used across are declared here.|
|src/main/validators|Validation of request data from APIs declared are done here.|
|src/test|Contains the unit test cases for the codes implemented under the main folder.|

## 5. DB Schema
Below describes the DB tables implemented and the schema of each DB table.

### 5.1. DB Table : Teachers

|Column Name|Column Description|Column Properties|Primary Key|
|:---|:---|:---|:---|
|email|Teacher's email address|varchar(255) not null|YES|
  
### 5.2. DB Table : Students

|Column Name|Column Description|Column Properties|Primary Key|
|:---|:---|:---|:---|
|email|Student's email address|varchar(255) not null|YES|
|teachers|List of teacher's email addresses (delimited by comma) that the student is registered under|varchar(1024) not null|NO|
|status|Student's profile statu. Currrent LOVs are ad follows: active, suspend|varchar(255) not null|NO|
  
*LOV : List Of Values

## 6. API Interface Specs
Below details the list of APIs implemented and their specifications.
  
### 6.1. APIs Implemented
#### 6.1.1. registerStudents
  - URL Path: /api/register
  - HTTP Method: POST
  - Description: Use Case 1 : This API enables teachers to register one or more students to a specified teacher.
  - Headers:
    |Header Name|Header Value|
    |:---|:---|
    |Content-Type|application/json|
  - Request Body:
    |JSON Attribute Name|JSON Attribute Value Type|Mandatory|Description|
    |:---|:---|:---|:---|
    |teacher|email address (String)|YES|Teacher's email address to register students under.|
    |students|List of email address (Array of String)|YES|List of student's email addresses to be registered.|
  - Request Params: NIL
  - Response:
    - General Response Structure:
        |JSON Attribute Name|JSON Attribute Value Type|Description|
        |:---|:---|:---|
        |code|Integer (LOVs : 202, 204, 400, 500)|HTTP codes|
        |message|String / Objects[]|Any error or success message definitions|
        |errors|String[]|More detailed list of error messages|
        |isSuccess|Boolean|Indicates if teh API call outcome is success or failure in overall|
    - Success Sample:
      - HTTP Response Code: 204
      - Response Body: NIL
    - Partial Success Sample:
      - HTTP Response Code: 202
      ```
      {
        "code": 202,
        "message": {
          "added": [
            "Teacher record (teacherkenny@gmail.com) added successfully."
          ],
          "skipped": [],
          "updated": []
        },
        "errors": [
          "ERROR adding Student record (commonstudent1@gmail.com) : ER_NO_SUCH_TABLE: Table 'nodejsdb.students' doesn't exist"
        ],
        "isSuccess": true
      }
      ```
      - message.added[] : List of Student and Teacher records that were added to DB.
      - message.skipped[] : List of Student and Teacher records that were skipped due to already present in DB.
      - message.updated[] : List of Student records that were updated in DB (updating teachers column) for existing Student records.
    - Fail Sample:
      - HTTP Response Code: 400
      - Response Body:
      ```
      {
        "code": 400,
        "message": "Data Validation Failed.",
        "errors": [
          "JSON key (teacher) is missing / value is empty.",
          "Data is not valid for JSON key (students). Email address is expected."
        ],
        "isSuccess": false
      }
      ```
#### 6.1.2. retrieveStudentsCommonToTeachers
  - URL Path: /api/commonstudents
  - HTTP Method: GET
  - Description: Use Case 2 : This API enables teachers to retrieve a list of students registered under the given list of teachers.
  - Headers:
    |Header Name|Header Value|
    |:---|:---|
    |Content-Type|application/json|
  - Request Body: NIL
  - Request Params:
    |Parameter Name|Parameter Value Type|Mandatory|Description|
    |:---|:---|:---|:---|
    |teacher|String|YES|Teacher's email address.|
  - Response:
    - General Response Structure:
        |JSON Attribute Name|JSON Attribute Value Type|Description|
        |:---|:---|:---|
        |code|Integer (LOVs : 202, 204, 400, 500)|HTTP codes|
        |message|String / Objects[]|Any error or success message definitions|
        |errors|String[]|More detailed list of error messages|
        |isSuccess|Boolean|Indicates if teh API call outcome is success or failure in overall|
    - Success Sample:
      - HTTP Response Code: 200
      - Response Body:
        ```
        {
          "students": [
            "commonstudent1@gmail.com",
            "commonstudent4@gmail.com"
          ]
        }
        ```
    - Fail Sample:
      - HTTP Response Code: 400
      - Response Body:
      ```
      {
        "code": 400,
        "message": "Data Validation Failed.",
        "errors": [
          "Request Param (teacher) is null / empty."
        ],
        "isSuccess": false
      }
      ```
#### 6.1.3. suspendStudent
  - URL Path: /api/suspend
  - HTTP Method: POST
  - Description: Use Case 3 : This API enables teachers to suspend a specific student.
  - Headers:
    |Header Name|Header Value|
    |:---|:---|
    |Content-Type|application/json|
  - Request Body:
    |JSON Attribute Name|JSON Attribute Value Type|Mandatory|Description|
    |:---|:---|:---|:---|
    |student|String|YES|Student's email address to be suspended.|
  - Request Params: NIL
  - Response:
    - General Response Structure:
        |JSON Attribute Name|JSON Attribute Value Type|Description|
        |:---|:---|:---|
        |code|Integer (LOVs : 202, 204, 400, 500)|HTTP codes|
        |message|String / Objects[]|Any error or success message definitions|
        |errors|String[]|More detailed list of error messages|
        |isSuccess|Boolean|Indicates if teh API call outcome is success or failure in overall|
    - Success Sample:
      - HTTP Response Code: 204
      - Response Body: NIL
    - Fail Sample:
      - HTTP Response Code: 400
      - Response Body:
      ```
      {
        "code": 400,
        "message": "Data Validation Failed.",
        "errors": [
          "JSON key (student) is missing / value is empty."
        ],
        "isSuccess": false
      }
      ```
#### 6.1.4. retrieveStudentsForNotifications
  - URL Path: /api/retrievefornotifications
  - HTTP Method: POST
  - Description: Use Case 4 : This API enables teachers to retrieve list of students who can receive a notification.
  - Headers:
    |Header Name|Header Value|
    |:---|:---|
    |Content-Type|application/json|
  - Request Body:
    |JSON Attribute Name|JSON Attribute Value Type|Mandatory|Description|
    |:---|:---|:---|:---|
    |teacher|String|YES|Teacher's email address to retrieve list of Students under this email.|
    |notification|String|YES|Notification content to be sent to students. Notification content can contain mentioning of student;s email addresses to be sent notification to.|
  - Request Params: NIL
  - Response:
    - General Response Structure:
        |JSON Attribute Name|JSON Attribute Value Type|Description|
        |:---|:---|:---|
        |code|Integer (LOVs : 202, 204, 400, 500)|HTTP codes|
        |message|String / Objects[]|Any error or success message definitions|
        |errors|String[]|More detailed list of error messages|
        |isSuccess|Boolean|Indicates if teh API call outcome is success or failure in overall|
    - Success Sample:
      - HTTP Response Code: 200
      - Response Body:
        ```
        {
          "recipients": [
            "commonstudent1@gmail.com",
            "commonstudent4@gmail.com"
          ]
        }
        ```
    - Fail Sample:
      - HTTP Response Code: 400
      - Response Body:
      ```
      {
        "code": 400,
        "message": "Data Validation Failed.",
        "errors": [
          "JSON key (teacher) is missing / value is empty.",
          "JSON key (notification) is missing / value is empty."
        ],
        "isSuccess": false
      }
      ```
### 6.2. Response Codes
Below lists the HTTP Response codes that are return by the API implementation:
|HTTP Response Code|Description|Usage|
|:---|:---|:---|
|200|OK|When request is processed successfully. Response body is returned if available.|
|202|Accepted|When required is partial success, with some success and some errors. Response body is contains the Response object detailing the outcome of processing.|
|204|No Content|When request is processed successfully and response body not required to be returned.|
|400|Bad Request|When request content validation fails.|
|500|Internal Server Error|When any exception occurs / business logic exceptions occurs / DB query exceptions occurs.|


## 7. Compiling and Testing Instructions
### 7.1. Pre-requisites
#### 7.1.1. Ensure NodeJS and NPM are installed
```
C:\Users>node --version
v16.14.0

C:\Users>npm --version
8.3.1
```
#### 7.1.2. Configure / Setup required database, tables and connection
- Ensure MySQL is installed on local machine.
- Refer to dbScripts.sql file in the root project directory and execute the SQL scripts present in dbScripts.sql file.
- Refer to src/main/config/DBConfig.js file and change the DB configuration accordingly:
```diff
/*
    Author: Premkumar
    Description: Contains the Database (DB) confiuration and initialisation.
*/

// DB Config for Datasource ======================================
/* Synchronous DB Config */
const mysql = require('sync-mysql'); 

module.exports = function(){
    const connection = new mysql({
-        host: '<to_be_modified_accordingly>',
-        user: '<to_be_modified_accordingly>',
-        password: '<to_be_modified_accordingly>',
        database: 'nodejsdb'
      });

    return connection;
}
```

#### 7.1.3. Setup Postman API collection
- Ensure Postman is installed on local machine.
- Refer to NodeJS API Assessment.postman_collection.json file in root project directory, import that postman collection file into Postman.

### 7.2. Compiling the project
- Download the project code from GitHub link (above).
- Using the CMD / Terminal, go to the NodeJS directory and execute the following command:
  ```
  C:\Users\Downloads\nodejs-api-server-main\nodejs-api-server-main>npm install
  ```
- After downloading and installing the required dependencies are completed, start the application by executing the following command:
  ```
  C:\Users\Downloads\nodejs-api-server-main\nodejs-api-server-main>npm start
  ```
- Once application started successfully, you will see the following logs printed out:
  ```
  > my-server@1.0.0 start
  > node ./index.js

  {"class":"DBConfigTest","method":"testDBConnection","message":[{"NOW()":"2022-03-29T08:13:24.000Z"}]}
  {"class":"DBConfigTest","method":"testDBConnection","message":"Connected to MySQL DB Server!"}
  {"class":"Index","method":"default","message":"Server is running on PORT: 8081"}
  ```
- After application is started successfully, you can use the Postman collection to test make the API calls to application.

### 7.3. Running Unit Test
For unit testing, Jest module is being used to conduct unit testing for the functionalities implemented.

Run the following command in CMD / Terminal to run unit testing:
```
C:\Users\Downloads\nodejs-api-server-main\nodejs-api-server-main>npm test
```
The above command will run the unit tests codes declared under the src/test directory.

When all unit test have passed successfully, the outcome will be displayed as shown below:
```
Test Suites: 8 passed, 8 total
Tests:       51 passed, 51 total
Snapshots:   0 total
Time:        2.976 s, estimated 5 s
Ran all test suites.

C:\Users\Downloads\nodejs-api-server-main\nodejs-api-server-main>
```
The unit test coverage statistics can be viewed by executing the following command:
```
C:\Users\Downloads\nodejs-api-server-main\nodejs-api-server-main>npx jest --coverage
```

Below shows the sample output of unit test coverage statistics:
```
---------------------------|---------|----------|---------|---------|------------------------------------------------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------|---------|----------|---------|---------|------------------------------------------------------------
All files                  |   65.32 |    78.68 |   83.01 |   65.37 |
 config                    |     100 |      100 |     100 |     100 |
  ControllerConfig.js      |     100 |      100 |     100 |     100 |
  DBConfig.js              |     100 |      100 |     100 |     100 |
  ExpressConfig.js         |     100 |      100 |     100 |     100 |
 constants                 |     100 |      100 |     100 |     100 |
  ErrorCodeConstants.js    |     100 |      100 |     100 |     100 |
  ResponseCodeConstants.js |     100 |      100 |     100 |     100 |
  StudentConstants.js      |     100 |      100 |     100 |     100 |
 controller                |      80 |      100 |     100 |      80 |
  ApiController.js         |   78.94 |      100 |     100 |   78.94 | 42-47,92-97,129-134,183-188
  BaseController.js        |     100 |      100 |     100 |     100 |
 model/response            |   83.33 |      100 |      50 |   83.33 |
  ResponseModel.js         |   83.33 |      100 |      50 |   83.33 | 15
 repo                      |   12.98 |        0 |       0 |   13.07 |
  StudentRepo.js           |   10.52 |        0 |       0 |   10.61 | 16-43,48-75,80-107,112-139,144-181,186-213
  TeacherRepo.js           |      20 |        0 |       0 |      20 | 15-42,47-75
 service                   |   85.09 |    89.05 |     100 |   85.09 |
  ApiService.js            |     100 |      100 |     100 |     100 |
  StudentService.js        |   79.59 |    86.59 |     100 |   79.59 | 28-35,46-48,67-68,78-80,91,123-125,137-139,158-159,184-186
  TeacherService.js        |      80 |    88.88 |     100 |      80 | 25-26,36-38
 utils                     |   90.47 |     87.5 |     100 |   90.24 |
  CommonUtils.js           |   88.88 |     87.5 |     100 |   88.57 | 31-34
  LoggingUtils.js          |     100 |      100 |     100 |     100 |
 validators                |    81.7 |    85.71 |     100 |    81.7 |
  ApiValidators.js         |   80.51 |    85.45 |     100 |   80.51 | 14,23,32,36,42,46,64,70,74,88,97,109,118,131,151
  CommonValidators.js      |     100 |      100 |     100 |     100 |
---------------------------|---------|----------|---------|---------|------------------------------------------------------------

Test Suites: 8 passed, 8 total
Tests:       51 passed, 51 total
Snapshots:   0 total
Time:        3.269 s, estimated 4 s
Ran all test suites.

C:\Users\Downloads\nodejs-api-server-main\nodejs-api-server-main>
```
