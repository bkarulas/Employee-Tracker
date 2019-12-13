USE employee_tracker_db;


SELECT id, first_name, last_name FROM employee LEFT JOIN role ON employee.role_id = role.id;

SELECT employee.id, first_name 'First Name', last_name 'Last Name', title 'Title', department.name 'Department', salary 'Salary', manager_id 'Manager' FROM employee 
	LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    GROUP BY employee.id ORDER BY employee.id;


-- INNER JOIN employee ON manager.id = employee.id --
-- , CONCAT(employee.first_name, ', ', last_name) AS manager.id, --


-- departmentdepartment --
-- SELECT first_name, last_name, title, salary FROM employee LEFT JOIN role ON employee.role_id = role.id --

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;