const inquirer = require('inquirer');
const dbHelpers = require('./dbHelpers');


async function mainMenu() {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
       
      ],
    },
  ]);

  switch (choice) {
    case 'View all departments':
      viewDepartments();
      break;
    case 'View all roles':
      viewRoles();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    
  }
}


async function viewDepartments() {
  const departments = await dbHelpers.getAllDepartments();
  console.table(departments);
  mainMenu();
}


async function viewRoles() {
  const roles = await dbHelpers.getAllRoles();
  console.table(roles);
  mainMenu();
}


async function viewEmployees() {
  const employees = await dbHelpers.getAllEmployees();
  console.table(employees);
  mainMenu();
}

mainMenu();
