require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Yankeeswin!99",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

db.connect((err) => {
  if (err) throw err;
  promptUser();
});

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    //   continue this for all options
    .then(function ({ choices }) {
      switch (choices) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
      }
    });
}

function viewAllDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
  });
}

function viewAllRoles() {
    // join function for dept_id
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
  });
}

function viewAllEmployees() {
    // join function for dept_id
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
  });
}

function addRole() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
    const depChoices = results.map(({id, dept_name}) => ({
        name: dept_name,
        value: id
    }))
    console.log(depChoices)

    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the role",
        },
        {  
            type: "input",
            name: "salary",
            message: "What is the salary of the role",

        },
        {  
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to",
            choices: depChoices
        }
        ]).then((data) =>{
            console.log(data)

            db.query(
                "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
                [data.title, data.salary, data.department_id],
                function (err, results) {
                    console.table(results);
                    promptUser()
                }
                );
            })
  });
}
