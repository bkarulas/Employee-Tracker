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
  connection.query("SELECT * FROM role;", function(err, res){
    if (err) throw err;
   allRoles = res.map(role=>({name:role.title, value:role.id}));
  });
  connection.query("SELECT * FROM employee;",function (err,res){
    if (err) throw err;
    allEmployees = res.map(employee=>({name:`${employee.first_name} ${employee.last_name}`, value:employee.id}));
  });
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
        "Delete An Employee",
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
      case "Add An Employee":
        newEmployee();
        break;
      case "Delete An Employee":
        deleteEmployee();
        break;
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

function newEmployee(){
  inquirer
    .prompt([
    {
      type:"input",
      message:"What the the first name of the employee?",
      name:"newFirstName"
    },
    {
      type:"input",
      message:"What is the last name of the employee?",
      name:"newLastName"
    },
    {
      type:"list",
      message:"What is the role of the new employee?",
      name:"newRole",
      choices: allRoles
    },
    {
      type:"list",
      message:"Who will be the employee's manager?",
      name:"newManager",
      choices: allEmployees
    }
  ])
  .then(function(answer) {
    addEmployee(answer.newFirstName,answer.newLastName,answer.newRole,answer.newManager);
    console.log(`The new employee:${answer.newFirstName} ${answer.newLastName} was added`);
    firstQuestion()
  })
}

function addEmployee(firstName, lastname, role, manager){
  query = "INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES (?,?,?,?);"
  connection.query(query,[firstName,lastname,role,manager], function(err, res){
  })
}

function deleteEmployee(){
  inquirer
    .prompt([
    {
      type:"list",
      message:"What employee would you like to delete?",
      name:"employeeDelete",
      choices: allEmployees
    }
  ])
  .then(function(answer) {
    removeEmployee(answer.employeeDelete);
    console.log(`Employee ID:${answer.employeeDelete} was deleted`);
    firstQuestion()
  })
}

function removeEmployee(employeeId){
  query = "DELETE FROM employee WHERE employee.id = ?;"
  console.log(`ANSWER: ${employeeId}`);
  connection.query(query,[employeeId], function(err, res){
  });
}

