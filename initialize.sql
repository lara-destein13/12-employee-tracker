USE employees;

DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT.
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role {
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO role (name, salary, department_id) VALUES('Executive Chef', 1000000, 1);
INSERT INTO role (name, salary, department_id) VALUES('Corporate Chef', 80000, 2);
INSERT INTO role (name, salary, department_id) VALUES('Sous Chef', 20000, 2);
INSERT INTO role (name, salary, department_id) VALUES('Prep Cook', 80000, 3);
INSERT INTO role (name, salary, department_id) VALUES('Dishwasher', 20000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Mchaela', 'Rose', 1, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Ryan', 'Brewer', 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Becka', 'Johnson', 3, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Charles', 'Green', 4, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('Emily', 'Smith', 5, 4);
