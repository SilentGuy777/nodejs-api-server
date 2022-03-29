# NodeJS API Assessment
Below describes the implementation of NodeJS backend server implementation for the NodeJS API Assessment. 

## Objective / Background
Teachers need a system where they can perform administrative functions for their students.
Teachers and students are identified by their email addresses.

Therefore a backend system is being implemented that exposes APIs (Application Programming Interface) that allows the Teachers to perform their required administrative functions.

## Framework used
NodeJS with Javascript is being used for this backend server implementation.

Modules imported in NodeJS:

|Module Name|Usage Description|Command|
|:---|:---|:---|
|express|For API Implementation|npm install express --save|                
|email-validator|To validate email address|npm install email-validator --save|
|sync-mysql|Synchronous DB query Implementation|npm install sync-mysql --save|
|jest|Used for unit testing|npm install --save-dev jest|
|supertest|Used with jest for unit testing of APIs|npm install --save-dev supertest|

## Assumptions
Assume that login and access control have already been handled.

## Project Structure and Design
The project structure is defined as follows:
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
|src/main/service|Business logics and information processing logics are declred here.|
|src/main/utils|Common utility functions that can be used across are declared here.|
|src/main/validators|Validation of request data from APIs declared are done here.|
|src/test|Contains the unit test cases for the codes implemented under the main folder.|

## DB Schema
Below describes the DB tables implemented and the schema of each DB table.

### 1. DB Table : Teachers

|Column Name|Column Description|Column Properties|Primary Key|
|:---|:---|:---|:---|
|email|Teacher's email address|varchar(255) not null|YES|
  
### 2. DB Table : Students

|Column Name|Column Description|Column Properties|Primary Key|
|:---|:---|:---|:---|
|email|Student's email address|varchar(255) not null|YES|
|teachers|List of teacher's email addresses (delimited by comma) that the student is registered under|varchar(1024) not null|NO|
|status|Student's profile statu. Currrent LOVs are ad follows: active, suspend|varchar(255) not null|NO|
  
*LOV : List Of Values

## API Interface Specs
Below details the list of APIs implemented and their specifications.
  
### 1. registerStudents
  - URL Path: /api/register
  - HTTP Method: POST
  - Description: Use Case 1 : This API enables teachers to register one or more students to a specified teacher.
  - Headers
    |Header Name|Header Value|
    |:---|:---|
    |Content-Type|application/json|
  - Request Body
    |JSON Attribute Name|JSON Attribute Value Type|Mandatory|Description|
    |:---|:---|:---|:---|
    |teacher|email address (String)|YES|Teacher's email address to register students under.|
    |students|List of email address (Array of String)|YES|List of student's email addresses to be registered.|
  - Request Params: NIL
  - Response
    - General Response Structure
        |JSON Attribute Name|JSON Attribute Value Type|Description|
        |:---|:---|:---|
        |code|Integer (LOVs : 202, 204, 400, 500)|HTTP codes|
        |message|String / Objects[]|Any error or success message definitions|
        |errors|String[]|More detailed list of error messages|
        |isSuccess|Boolean|Indicates if teh API call outcome is success or failure in overall|
    - Success Sample
      - HTTP Response Code: 204
      - Response Body: NIL
    - Partial Success Sample
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
    - Fail Sample
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
### 2. retrieveStudentsCommonToTeachers
  - URL Path: /api/commonstudents
  - HTTP Method: GET
  - Description: Use Case 2 : This API enables teachers to retrieve a list of students registered under the given list of teachers.
  - Headers
    |Header Name|Header Value|
    |:---|:---|
    |Content-Type|application/json|
  - Request Body
    NIL
  - Request Params
    |Parameter Name|Parameter Value Type|Mandatory|Description|
    |:---|:---|:---|:---|
    |teacher|String|YES|Teacher's email address.|
  - Response
    - General Response Structure
        |JSON Attribute Name|JSON Attribute Value Type|Description|
        |:---|:---|:---|
        |code|Integer (LOVs : 202, 204, 400, 500)|HTTP codes|
        |message|String / Objects[]|Any error or success message definitions|
        |errors|String[]|More detailed list of error messages|
        |isSuccess|Boolean|Indicates if teh API call outcome is success or failure in overall|
    - Success Sample
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
    - Fail Sample
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
### 3. suspendStudent
  - URL Path: /api/suspend
  - HTTP Method: POST
  - Description: Use Case 3 : This API enables teachers to suspend a specific student.
  - Headers
    |Header Name|Header Value|
    |:---|:---|
    |Content-Type|application/json|
  - Request Body
    |JSON Attribute Name|JSON Attribute Value Type|Mandatory|Description|
    |:---|:---|:---|:---|
    |student|String|YES|Student's email address to be suspended.|
  - Request Params
    NIL
  - Response
    - General Response Structure
        |JSON Attribute Name|JSON Attribute Value Type|Description|
        |:---|:---|:---|
        |code|Integer (LOVs : 202, 204, 400, 500)|HTTP codes|
        |message|String / Objects[]|Any error or success message definitions|
        |errors|String[]|More detailed list of error messages|
        |isSuccess|Boolean|Indicates if teh API call outcome is success or failure in overall|
    - Success Sample
      - HTTP Response Code: 204
      - Response Body:
        NIL
    - Fail Sample
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
### 4. retrieveStudentsForNotifications
  - URL Path: /api/retrievefornotifications
  - HTTP Method: POST
  - Description: Use Case 4 : This API enables teachers to retrieve list of students who can receive a notification.
  - Headers
    |Header Name|Header Value|
    |:---|:---|
    |Content-Type|application/json|
  - Request Body
    |JSON Attribute Name|JSON Attribute Value Type|Mandatory|Description|
    |:---|:---|:---|:---|
    |teacher|String|YES|Teacher's email address to retrieve list of Students under this email.|
    |notification|String|YES|Notification content to be sent to students. Notification content can contain mentioning of student;s email addresses to be sent notification to.|
  - Request Params
    NIL
  - Response
    - General Response Structure
        |JSON Attribute Name|JSON Attribute Value Type|Description|
        |:---|:---|:---|
        |code|Integer (LOVs : 202, 204, 400, 500)|HTTP codes|
        |message|String / Objects[]|Any error or success message definitions|
        |errors|String[]|More detailed list of error messages|
        |isSuccess|Boolean|Indicates if teh API call outcome is success or failure in overall|
    - Success Sample
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
    - Fail Sample
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

## Compiling and Testing Instructions
### Pre-requisites
1. Ensure NodeJS and NPM are installed
2. Configure /setup required database, tables and connection
3. Setup Postman API collection
