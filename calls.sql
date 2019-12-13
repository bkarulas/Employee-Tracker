USE employee_tracker_db;


SELECT id, first_name, last_name FROM employee LEFT JOIN role ON employee.role_id = role.id;

-- ALL EMPLOYEES --
SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
	LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department on role.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id 
    ORDER BY employee.id;

-- ALL EMPLOYEES BY DEPARTMENT --
SELECT name 'departments', CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM department INNER JOIN role on role.department_id = department.id INNER JOIN employee on employee.role_id = role.id ORDER BY department.id;

-- ALL EMPLOYEES BY MANAGER --
SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM employee INNER JOIN employee manager on manager.id = employee.manager_id ORDER BY manager.id;
    


SELECT first_name, last_name FROM employee WHERE 