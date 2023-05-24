DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    dept_name VARCHAR(30) NOT NULL
)

CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL NOT NULL,
    department_id: INT NOT NULL
)

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT NOT NULL,
    manager_id: INT NOT NULL
)