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

        });
}



// "add" functions
function addDepartment() {
    inquirer
        .prompt(
            {
                name: "department",
                type: "input",
                message: "Enter the department",
            }
            // {
            //     name: "departmentid",
            //     type: "number",
            //     message: "Enter the department Id number",
            // }
        ).then(function (newDept) {

            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: newDept.department,
                    // id: newDept.departmentid
                },
                function (err, data) {
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
            name: "role",
            type: "input",
            message: "Enter the Role",
        },
        {
            name: "salary",
            type: "number",
            message: "Enter the salary amount in dollars",
        },
        {
            name: "departmentid",
            type: "number",
            message: "Enter the departmentid"
        }

        ])
        .then(function (newRole) {

            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: newRole.role,
                    salary: newRole.salary,
                    departmentid: newRole.departmentid

                },
                function (err, data) {
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
            name: "employeeFN",
            type: "input",
            message: "Enter the Employee first name",
        },
        {
            name: "employeeLN",
            type: "input",
            message: "Enter the Employee last name",
        },
        {
            name: "roleid",
            type: "number",
            message: "Enter the Employee role ID number",
        },
        {
            name: "managerid",
            type: "number",
            message: "Enter the Employee manager ID number",
        }
        ])
        .then(function (newEmpl) {

            var query = "INSERT INTO employee SET ?";
            connection.query(query,
                {
                    firstname: newEmpl.employeeFN,
                    lastname: newEmpl.employeeLN,
                    roleid: newEmpl.roleid,
                    managerid: newEmpl.managerid,

                }, function (err, data) {
                    connection.query("SELECT * FROM employee", function (err, data) {

                        console.table(data);
                    })
                    runSearch();
                });
        });
}

// "view all" functions
function viewAllDepartments() {
    inquirer
        .prompt({
            type: "confirm",
            message: "You are trying to view all departments",
            name: "viewalldept",
            default: true
        })
        .then(function () {

            var query = "SELECT * FROM department ";

            connection.query(query, function (err, data) {
                console.log(data);
                runSearch();
            });
        });
}
function viewAllRoles() {
    inquirer
        .prompt({
            type: "confirm",
            message: "You are trying to view all roles?",
            name: "viewallroles",
            default: true
        })
        .then(function (answer) {

            var query = "SELECT * FROM role ";

            connection.query(query, function (err, data) {
                console.log(data);
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

            connection.query("SELECT * FROM employee", function (err, data) {
                console.log(data);
                runSearch();

            });
        });
}

// // "update" functions
// function updateEmployeeRole() {
//     inquirer
//         .prompt([
//             {
//             name: "choice",
//             type: "rawlist",
//             choices: function () {
//                 var choicesArray = [];
//                 for (let i = 0; i < array.length; i++) {
//                     choiceArray.push(results[i].item_name);

//                 }
//                 return choiceArray;
//             },
//             message: " Which Employee 's role would you like to update?"
//              },
//             {
//                 name: "role",
//                 type: "input",
//                 message: "what is the new role?"
//             }
        
        
//         ])
//         .then(function (answer) {
//             var query = "UPDATE employee SET ? WHERE ?";
//             connection.query(query,
//                 [
//                     {
//                         role: answer.role
//                     },
//                     {
//                         id: chosenItem.id
//                     }
//                 ], function (error) {
//                     if (error) throw err;
//                     console.log("Role of this employee is updated successfully!");

//                     runSearch();
//                 });
//         });
// }
