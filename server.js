var mysql = require("mysql");
var inquirer= require("inquirer");

//connects to the database
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
    //creates a list of roles and their corresponding role id
   allRoles = res.map(role=>({name:role.title, value:role.id}));
  });

});
//updates the list of employee names and id
function employeeList(){
  connection.query("SELECT * FROM employee;",function (err,res){
    if (err) throw err;
    //makes a list of employees combinding first and last name and their corresponding employee id
    allEmployees = res.map(employee=>({name:`${employee.first_name} ${employee.last_name}`, value:employee.id}));
  });
}

//MAIN MENU
function firstQuestion() {
  //gets the updated list of employess and ids
  employeeList()
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
        "Update An Employee Role",
        "Update An Employee Manager",
        "exit"
      ]
    })
    .then(function(answer) {
      //Switch Case for the answer
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
      case "Update An Employee Role":
        updateRole();
        break;
      case "Update An Employee Manager":
        updateManager();
        break;
      case "exit":
        //kills the conection to the database and ends the application
        connection.end();
        break;
      }
    });
  }

//used for the first 3 questions, general searches
function generalSearch(query){
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    //calls back the first question
    firstQuestion()
  });
}

//NEW EMPLOYEE
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
    //sends the answers above to the function that adds the employee
    addEmployee(answer.newFirstName,answer.newLastName,answer.newRole,answer.newManager);
    console.log(`The new employee:${answer.newFirstName} ${answer.newLastName} was added`);
    //calls back the first question
    firstQuestion()
  })
}

//function that makes the query to the database to add the employee
function addEmployee(firstName, lastname, role, manager){
  query = "INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES (?,?,?,?);"
  connection.query(query,[firstName,lastname,role,manager], function(err, res){
    if (err) throw err;
  })
}

//DELETE EMPLOYEE
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
    //sends the employee id to the function that deletes the employee
    removeEmployee(answer.employeeDelete);
    console.log("The employee has been deleted")
    //calls back the first question
    firstQuestion()
  })
}

//function that makes the query to the database to delete the employee
function removeEmployee(employeeId){
  query = "DELETE FROM employee WHERE employee.id = ?;"
  connection.query(query,[employeeId], function(err, res){
    if (err) throw err;
  });
}


//UPDATE ROLE
function updateRole(){
  inquirer
    .prompt([
      {
        type:"list",
        message:"Who's role would you like to update?",
        name:"employeeId",
        choices: allEmployees
      },
      {
        type:"list",
        message:"What is the new role of the employee",
        name:"newRole",
        choices: allRoles
      }
    ])
    .then(function(answer){
      //query to the database to change the employe role id according to the employee id
      connection.query("UPDATE employee SET employee.role_id = ? WHERE employee.id = ?;",[answer.newRole, answer.employeeId], function(err, res){
        if (err) throw err;
      });
      //calls back the first question
      console.log("The role has been updated for the employee")
      firstQuestion()
    })
}

//UPDATE MANAGEER
function updateManager(){
  inquirer
    .prompt([
      {
        type:"list",
        message:"Which employee's manager do you want to update?",
        name:"employeeId",
        choices: allEmployees
      },
      {
        type:"list",
        message:"Which employee do you want to set as manager for the selected employee?",
        name:"managerID",
        choices: allEmployees
      }
    ])
    .then(function(answer){
      //query to the database to change the employe manager id according to the employee id
      connection.query("UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?;",[answer.managerID, answer.employeeId], function(err, res){
        if (err) throw err;
      });
      //calls back the first question  
      console.log("The manager has been updated for the employee")
      firstQuestion()
    })
}

