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
    if(err) {console.log(err)}
    promptUser();
  });
}

function viewAllRoles() {
  // join function for dept_id
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    if(err) {console.log(err)}
    promptUser();
  });
}

function viewAllEmployees() {
  // join function for dept_id 
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
    if(err) {console.log(err)}
    promptUser();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept_name",
        message: "What is the name of the department",
      },
      {
        type: "input",
        name: "id",
        message: "Please add new department ID",
      },
    ])
    .then((data) => {
      console.log(data);

      db.query(
        "INSERT INTO departments (id, dept_name) VALUES (?, ?)",
        [data.id, data.dept_name],
        function (err, results) {
          console.table(results);
          promptUser();
        }
      );
    });
}

function addRole() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
    const depChoices = results.map(({ id, dept_name }) => ({
      name: dept_name,
      value: id,
    }));
    console.log(depChoices);

    inquirer
      .prompt([
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
          choices: depChoices,
        },
      ])
      .then((data) => {
        console.log(data);

        db.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [data.title, data.salary, data.department_id],
          function (err, results) {
            if(err) {console.log(err)}
            console.table(results);
            promptUser();
          }
        );
      });
  });
}

function addEmployee() {
  db.query(
    "SELECT first_name, last_name, id FROM employees",
    function (err, results) {
      console.table(results);
      const empChoices = results.map(({ first_name, last_name, id }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      console.log(empChoices);

      db.query("SELECT title, id FROM roles", function (err, results) {
        console.table(results);
        const roleChoices = results.map(({ title, id }) => ({
          name: title,
          value: id
        }));
        console.log(roleChoices);

        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the first name of the employee",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the last name of the employee",
            },
            {
              type: "list",
              name: "role",
              message: "What is the role of the employee",
              choices: roleChoices,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is the manager of the new employee",
              choices: empChoices,
            },
          ])
          .then((data) => {
            console.log(data);

            db.query(
              "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
              [data.first_name, data.last_name, data.role, data.manager],
              function (err, results) {
                if(err) {console.log(err)}
                console.table(results);
                promptUser();
              }
            );
          });
      });
    }
  );
}

function updateEmployee() {
    db.query("SELECT * FROM roles", function (err, results) {
      console.table(results);
      const roleUpdate = results.map(({ id, title }) => ({
        name: title,
        value: id
      }));
      console.log(roleUpdate);

      inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Update the first name of the employee",
        },
        {
          type: "input",
          name: "last_name",
          message: "Update the last name of the employee",
        },
        {
          type: "list",
          name: "title",
          message: "Update the role of the employee",
          choices: roleUpdate,
        },
        
        ])
        .then((data) => {
          console.log(data);
  
          db.query(
            "UDPATE employees SET (first_name, last_name, role_id) VALUES (?, ?, ?)",
            [data.first_name, data.last_name, data.title],
            function (err, results) {
              if(err) {console.log(err)}
              console.table(results);
              promptUser();
            }
          );
        });
    })}