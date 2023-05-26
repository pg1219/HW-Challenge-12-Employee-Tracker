const consoleTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Yankeeswin!99",
    database: "movies_db",
  },
  console.log(`Connected to the employee_db database.`)
);
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

db.connect((err) => {
    if(err) throw err;
    promptUser()
})


function promptUser() {
  inquirer.prompt([
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
  .then(function ({option}) {
    switch(option.choices){
        case "View all departments":
           viewAllDepartments();
           break;
        })
    }
  })
}

