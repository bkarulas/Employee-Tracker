var mysql = require("mysql");
var inquirer= require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password: "root",
    database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  firstQuestion();
});

function firstQuestion() {
  let query="";
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employess",
        "View All Employees By Department",
        "View All Employees By  Manager",
        "Add An Employee",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employess":
        query = "SELECT employee.id, employee.first_name 'first name', employee.last_name 'last name', role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id ORDER BY employee.id;"
        generalSearch(query);
        break;
      case "View All Employees By Department":
        query = "SELECT name 'departments', CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM department INNER JOIN role on role.department_id = department.id INNER JOIN employee on employee.role_id = role.id ORDER BY department.id;"
        generalSearch(query);
        break;
      case "View All Employees By  Manager":
        query = "SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM employee INNER JOIN employee manager on manager.id = employee.manager_id ORDER BY manager.id;"
        generalSearch(query);
        break;
      case "Add An Employee"
        addEmployee();
      case "exit":
        connection.end();
        break;
      }
    });
  }


function generalSearch(query){
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    firstQuestion()
  });
}



