/* Create Database*/
CREATE DATABASE nodejsdb;
USE nodejsdb;

/* Create Table : Teachers */
CREATE TABLE Teachers(
    `email` varchar(255) not null,
    PRIMARY KEY (`email`)
);

/* Create Table : Students */
CREATE TABLE Students(
    `email` varchar(255) not null,
    `teachers` varchar(1024) not null,
    `status` varchar(20) not null,
    PRIMARY KEY (`email`)
);

/* Sample Input data to INSERT (optional) */
INSERT INTO Teachers (email) VALUES ('teacherken@gmail.com');
INSERT INTO Teachers (email) VALUES ('teacherken2@gmail.com');


INSERT INTO Students (email, teacher_email, status) VALUES ('student123@gmail.com', 'teacherken@gmail.com', 'active');
INSERT INTO Students (email, teacher_email, status) VALUES ('student456@gmail.com', 'teacherken2@gmail.com', 'active');
INSERT INTO Students (email, teacher_email, status) VALUES ('student789@gmail.com', 'teacherken@gmail.com,teacherken2@gmail.com', 'active');