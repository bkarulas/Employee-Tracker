-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS employee_tracker_db;

-- Created the DB "employee_tracker_db" (only works on local connections)
CREATE DATABASE employee_tracker_db;

-- Use the DB employee_tracker_db for all the rest of the script
USE employee_tracker_db;

-- Created the table "schools"
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id)
);

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Administration");

SELECT * FROM department;

INSERT INTO role (title, salary) VALUES ("Regional Manager",90000);
INSERT INTO role (title, salary,department_id) VALUES ("Sales Manager",80000,1);
INSERT INTO role (title, salary,department_id) VALUES ("Salesman",70000,1);
INSERT INTO role (title, salary,department_id) VALUES ("Lead Accountant",65000,2);
INSERT INTO role (title, salary,department_id) VALUES ("Accountant",55000,2);
INSERT INTO role (title, salary,department_id) VALUES ("Office Administratory",62500,3);
INSERT INTO role (title, salary,department_id) VALUES ("Quality Control",52500,3);
INSERT INTO role (title, salary,department_id) VALUES ("Supplier Relations",50000,3);
INSERT INTO role (title, salary,department_id) VALUES ("Customer Relations",47500,3);
INSERT INTO role (title, salary,department_id) VALUES ("Receptionist",45000,3);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name,role_id) VALUES ("Michael","Scott",1);
INSERT INTO employee (first_name, last_name,role_id) VALUES ("Jim","Halpert",2);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Dwight","Schrute",3,2);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Stanley","Hudson",3,2);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Phyllis","Lapin",3,2);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Angela","Martin",4,1);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Oscar","Gutierrez",5,6);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Kevin","Malone",5,6);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Pam","Beasley",6,1);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Creed","Bratton",7,9);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Meredith","Palmer",8,9);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Kelly","Kapoor",9,9);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Erin","Hannon",10,9);

SELECT * FROM employee;
