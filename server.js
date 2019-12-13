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
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employess",
        "View All Employees By Department",
        "View All Employees By  Manager",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employess":
        employeeAll();
        break;
      case "View All Employees By Department":
        employeeDepartment();
        break;
      case "View All Employees By  Manager":
        employeeManager();
        break;
      case "exit":
        connection.end();
        break;
      }
    });
  }



function employeeAll(){
  let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id ORDER BY employee.id;"
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    firstQuestion()
  });
}

function employeeDepartment(){
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "What Department Would You Like To See?",
      choices: viewAllDepartments();
    })
    .then(function(answer) {
      let query = ""
    })

}

function employeeManager(){
  let query = "";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    firstQuestion()
  });
}

function viewAllDepartments(){
  let query = "SELECT name 'departments' FROM department;"
  connection.query(query, function(err, res) {
    if (err) throw err;
    return res;
}
