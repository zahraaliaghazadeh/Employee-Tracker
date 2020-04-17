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
    // run the start function after the connection is made to prompt the user
    // start();
});

inquirer.prompt(

    {
        type: "list",
        message: "Select one option below",
        name: "action",
        // the * labeled ones are the minimum requirement
        choices: ["*view All Employees", "view All Employees By Department", "view All Employees By Manager", "*Add Employee", "Remove Employee", "*Update Employee Role", "Update Employee Manager", "*view All Roles", "*Add department", "*Add role", "*view All departments","View the total utilized budget of a department"]
    },

    {
        // add department
        type: "input",
        message: "Enter the Department",
        name: "department",
        when: (response) => response.action === '*Add department'
    },
    {
        // add role
        type: "input",
        message: "Enter the role",
        name: "role",
        when: (response) => response.action === '*Add role'

    },
    {
        // add employee
        type: "input",
        message: "Enter the Employee name",
        name: "employee",
        when: (response) => response.action === '*Add Employee'
        
    },
    {
        // view department
        
        when: (response) => response.action === '*view All departments'

    },
    {
        // view roles
        when: (response) => response.action === '*view All Roles'

    },
    {
        // view employees
        when: (response) => response.action === '*view All Employees'

    },
    {
        // update employee roles
        when: (response) => response.action === '*Update Employee Role'

    }

    // calling different functions based on the answer chosen
).then(function(answer){

    if(answer.action === "*Add department"){
        adddepartment();
    }
    else if(answer.action === "*Add role"){
        addrole();
    }
    else if(answer.action === "*Add Employee"){
        addemployee();
    }
    else if(answer.action === "*view All departments"){
        viewalldepartments();
    }
    else if(answer.action === "*view All Roles"){
        viewallroles();
    }
    else if(answer.action === "*view All Employees"){
        viewallemployees();
    }
    else if(answer.action === "*Update Employee Role"){
        updateemployeerole();
    }else{
        connection.end();
      }

})



