// for mysql npm
var mysql = require("mysql");
// for inquirer npm
var inquirer = require("inquirer");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employee_DB"
});



// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the run Search function after the connection is made to prompt the user
    console.log("listening to the port")
    runSearch();
});

function runSearch() {

    inquirer
        .prompt({
            type: "list",
            message: "Select one option below",
            name: "action",
            // the * labeled ones are the minimum requirement
            choices: [
                "*view All Employees",
                "view All Employees By Department",
                "view All Employees By Manager",
                "*Add Employee",
                "Remove Employee",
                "*Update Employee Role",
                "Update Employee Manager",
                "*view All Roles",
                "*Add department",
                "*Add role",
                "*view All departments",
                "View the total utilized budget of a department",
                "*Exit"
            ]
        })
        .then(function (answer) {

            // calling different functions based on the answer chosen

            if (answer.action === "*Add department") {
                addDepartment();
            }
            else if (answer.action === "*Add role") {
                addRole();
            }
            else if (answer.action === "*Add Employee") {
                addEmployee();
            }
            else if (answer.action === "*view All departments") {
                viewAllDepartments();
            }
            else if (answer.action === "*view All Roles") {
                viewAllRoles();
            }
            else if (answer.action === "*view All Employees") {
                viewAllEmployees();
            }
            else if (answer.action === "*Update Employee Role") {
                updateEmployeeRole();
            }
            else if (answer.action === "*Exit") {
                console.log("End!");
                connection.end();
            }
        })
}


// array = [
//     {
//         // add department
//         type: "input",
//         message: "Enter the Department",
//         name: "department",
//         when: (response) => response.action === '*Add department'
//     },
//     {
//         // add role
//         type: "input",
//         message: "Enter the role",
//         name: "role",
//         when: (response) => response.action === '*Add role'

//     },
//     {
//         // add employee
//         type: "input",
//         message: "Enter the Employee name",
//         name: "employee",
//         when: (response) => response.action === '*Add Employee'

//     }
//     // {
//     //     // view department

//     //     when: (response) => response.action === '*view All departments'

//     // },
//     // {
//     //     // view roles
//     //     when: (response) => response.action === '*view All Roles'

//     // },
//     // {
//     //     // view employees
//     //     when: (response) => response.action === '*view All Employees'

//     // },
//     // {
//     //     // update employee roles
//     //     when: (response) => response.action === '*Update Employee Role'

//     // }
// ]

// add functions
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter the Department",
            name: "department",
        })
        .then(function (newDept) {

            var query = "INSERT INTO departments";
            connection.query(query, { name: newDept.name }, function (err, data) {
                connection.query("SELECT * FROM department", function (err, data) {

                    console.table(data);
                })
                runSearch();
            });
        });
}
function addRole() {
    inquirer
        .prompt([{
            type: "input",
            message: "Enter the Role",
            name: "role",
        },
        {
            type: "input",
            message: "Enter the salary",
            name: "salary"
        }

        ])
        .then(function (newRole) {

            var query = "INSERT INTO role";
            connection.query(query, { name: newRole.title, salary: newRole.salary }, function (err, data) {
                connection.query("SELECT * FROM role", function (err, data) {

                    console.table(data);
                })
                runSearch();
            });
        });
}
function addEmployee() {
    inquirer
        .prompt([{
            type: "input",
            message: "Enter the Employee first name",
            name: "employeeFN",
        },
        {
            type: "input",
            message: "Enter the Employee last name",
            name: "employeeLN",
        }
        ])
        .then(function (newEmpl) {

            var query = "INSERT INTO employee";
            connection.query(query, { firstname: newEmpl.employeeFN ,lastname: newEmpl.employeeLN }, function (err, data) {
                connection.query("SELECT * FROM employee", function (err, data) {

                    console.table(data);
                })
                runSearch();
            });
        });
}

// view all functions
function viewAllDepartments() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter the Department",
            name: "department",
        })
        .then(function (answer) {

            var query = "SELECT FROM * department ";

            connection.query(query, function (err, res) {

                runSearch();
            });
        });
}
function viewAllRoles() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter the Department",
            name: "department",
        })
        .then(function (answer) {

            var query = "SELECT FROM * role ";

            connection.query(query, function (err, res) {

                runSearch();
            });
        });
}
function viewAllEmployees() {
    inquirer
        .prompt({
            type: "confirm",
            message: "You are trying to view all employees",
            name: "viewallempl",
            default: true
        })
        .then(function (answer) {

            var query = "SELECT FROM employee";

            connection.query(query, function (err, res) {
                console.table(res);
                runSearch();

            });
        });
}

// update functions
function updateEmployeeRole() {
    inquirer
        .prompt({
            type: "input",
            message: "Which Employee would you like to update the role for?",
            name: "updateemprole",
        })
        .then(function (answer) {
            var query = "UPDATE employee WHERE id= ?";
            connection.query(query, function (err, res) {
                runSearch();
            });
        });
}