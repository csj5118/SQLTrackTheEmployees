const inquirer = require('inquirer');
const dbhelp = require('./helpers/dbhelp');

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
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
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
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
  }
}

async function viewDepartments() {
  const departments = await dbhelp.getAllDepartments();
  console.table(departments);
  mainMenu();
}

async function viewRoles() {
  const roles = await dbhelp.getAllRoles();
  console.table(roles);
  mainMenu();
}

async function viewEmployees() {
  const employees = await dbhelp.getAllEmployees();
  console.table(employees);
  mainMenu();
}

async function addDepartment() {
  const { departmentName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    },
  ]);

  await dbhelp.addDepartment(departmentName);
  console.log('Department added successfully!');
  mainMenu();
}

async function addRole() {
  const departments = await dbhelp.getAllDepartments();
  const departmentChoices = departments.map(department => ({
    name: department.name,
    value: department.id
  }));

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the role:',
      choices: departmentChoices
    }
  ]);

  await dbhelp.addRole(title, salary, departmentId);
  console.log('Role added successfully!');
  mainMenu();
}

async function addEmployee() {
  const roles = await dbhelp.getAllRoles();
  const roleChoices = roles.map(role => ({
    name: role.title,
    value: role.id
  }));

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role for the employee:',
      choices: roleChoices
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the employee (if applicable):',
    }
  ]);

  await dbhelp.addEmployee(firstName, lastName, roleId, managerId);
  console.log('Employee added successfully!');
  mainMenu();
}

async function updateEmployeeRole() {
  const employees = await dbhelp.getAllEmployees();
  const employeeChoices = employees.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id
  }));

  const roles = await dbhelp.getAllRoles();
  const roleChoices = roles.map(role => ({
    name: role.title,
    value: role.id
  }));

  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee whose role you want to update:',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role for the employee:',
      choices: roleChoices
    }
  ]);

  await dbhelp.updateEmployeeRole(employeeId, roleId);
  console.log('Employee role updated successfully!');
  mainMenu();
}

mainMenu();
