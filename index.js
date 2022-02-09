const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
let trash = null;


// create the connection to the database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'employees'
});

// add department
const addDepartment = async () => {

    const prompt = {
        type: 'input',
        name: 'department',
        message: 'Department Name: ',
    };

    const promise = inquirer.prompt([prompt]);
    const answer = await promise;
    const department = answer.department;
    const query = `INSERT INTO department (name) VALUES ('${department}')`;
    const results = await runQuery(query);
};

// get all departments
const getAllDepartments = async () => {
    const query = `SELECT * FROM department`;
    const results = await runQuery(query);
    return results;
};

// get all employees
const getAllEmployees = async () => {
    const query = `SELECT * FROM employee`;
    const results = await runQuery(query);
    return results;
};

// get all roles
const getAllRoles = async () => {
    const query = `SELECT * FROM role`;
    const results = await runQuery(query);
    return results;
};

// add role
const addRole = async () => {

    const departments = await getAllDepartments();
    const departmentNames = departments.map((department) => department.name);

    const prompts = [
        {
            type: 'input',
            name: 'name',
            message: 'Title: ',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Salary: ',
        },
        {
            type: 'list',
            name: 'departmentName',
            message: 'Department: ',
            choices: departmentNames,
        },
    ];

    const promise = inquirer.prompt(prompts);
    const answer = await promise;
    const name = answer.name;
    const salary = answer.salary;
    const departmentName = answer.departmentName;

    let departmentId = 0;
    for (let i = 0; i < departments.length; i++) {
        const department = departments[i];
        if (department.name === departmentName) {
            departmentId = department.id;
        }
    }

    const query = `INSERT INTO role (name, salary, department_id) VALUES ('${name}', ${salary}, ${departmentId})`;
    const results = await runQuery(query);
};

// add employee
const addEmployee = async () => {

    const roles = await getAllRoles();
    const roleNames = roles.map((role) => role.name);

    // need to present user with list of employees
    // so need to query the database to get all of the employees
    const managers = await getAllEmployees();

    // compute the full name for each manager

    for (let i = 0; i < managers.length; i++) {
        const manager = managers[i];
        manager.full_name = `${manager.first_name} ${manager.last_name}`;
    }

    const managerFullNames = managers.map((manager) => manager.full_name);

    const prompts = [
        {
            type: 'input',
            name: 'firstName',
            message: 'First name: ',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Last name: ',
        },
        {
            type: 'list',
            name: 'roleName',
            message: 'Role: ',
            choices: roleNames,
        },
        {
            type: 'list',
            name: 'managerFullName',
            message: 'Manager: ',
            choices: managerFullNames,
        },
    ];
    
    const promise = inquirer.prompt(prompts);
    const answer = await promise;
    const firstName = answer.firstName;
    const lastName = answer.lastName;
    const roleName = answer.roleName;
    const managerFullName = answer.managerFullName;

    // now have role name, need the corresponding role ID;

    let roleId = 0;
    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        if (role.name === roleName) {
            roleId = role.id;
        }
    }

    // now have the manager full name, need the corresponding manager ID;

    let managerId = 0;
    for (let i = 0; i < managers.length; i++) {
        const manager = managers[i];
        if (manager.full_name === managerFullName) {
            managerId = manager.id;
        }
    }

    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, null)`;
    const results = await runQuery(query);
};

// run query
const runQuery = async (query) => {
    // console.log(`query: ${query}`);
    promise = new Promise((resolve,reject) => {
        const callback = (err, results, fields) => {
            if (err !== null) {
                console.log(`err: ${err}`);
                resolve([]);
            }
            trash = err;
            trash = fields;
            resolve(results);
        }
        connection.query(query, callback);
    });

    const results = await promise;
    return results;
};

// update role
const updateRole = async () => {
    // We want to present the user with a list of roles to choose from.
    // So, query the database to get all roles.
  
    const roles = await getAllRoles();
    const roleNames = roles.map((role) => role.name);
  
    // Want to present the user with a list of employees.
    // So, query the database to get all employees.
  
    const employees = await getAllEmployees();
  
    // Compute the full name for each employee
  
    for (let i = 0; i < employees.length; i ++) {
      const employee = employees[i];
      employee.full_name = `${employee.first_name} ${employee.last_name}`;
    }
  
    const employeeFullNames = employees.map((employee) => employee.full_name);
  
    const prompts = [
      {
        type: 'list',
        name: 'employeeFullName',
        message: 'Employee: ',
        choices: employeeFullNames,
      },
      {
        type: 'list',
        name: 'roleName',
        message: 'Role: ',
        choices: roleNames,
      },
    ];
  
    const promise = inquirer.prompt(prompts);
    const answer = await promise;
    const firstName = answer.firstName;
    const lastName = answer.lastName;
    const roleName = answer.roleName;
    const employeeFullName = answer.employeeFullName;
  
    // At this point, have the role name.  Find the corresponding role ID;
  
    let roleId = 0;
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      if (role.name === roleName) {
        roleId = role.id;
      }
    }
  
    // At this point, have the employee full name.  Find the corresponding employee ID;
  
    let employeeId = 0;
    for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      if (employee.full_name === employeeFullName) {
        employeeId = employee.id;
      }
    }
  
    const query = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`;
    const results = await runQuery(query);
  }


// view all departments
const viewAllDepartments = async () => {
    const query = 'SELECT * FROM department';
    const results = await runQuery(query);
    console.table(results);
};

// view all employees
const viewAllEmployees = async () => {
    const query = 'SELECT * FROM employee';
    const results = await runQuery(query);
    console.table(results);
};

// view all roles
const viewAllRoles = async () => {
    const query = 'SELECT * FROM role';
    const results = await runQuery(query);
    console.table(results);
};

// main
const main = async () => {

    while(true) {
        console.log('');

        const prompt = {
            type: 'list',
            name: 'action',
            message: 'what now?',
            choices: [
                'Add a department',
                'Add an employee',
                'Add a role',
                'Update an employee\'s role',
                'View all departments',
                'View all employees',
                'View all roles',
            ],
        };

        const promise = inquirer.prompt([prompt]);
        const answer = await promise;
        const action = answer.action;

        console.log('');

        if (action === 'Add a department') {
            await addDepartment();
        } else if (action === 'Add an employee') {
            await addEmployee();  
        } else if (action === 'Add a role') {
            await addRole();
        } else if (action === 'Update an employee\'s role') {
            await updateRole(); 
        } else if (action === 'View all departments') {
            await viewAllDepartments();
        }  else if (action === 'View all employees') {              
            await viewAllEmployees();
        } else if (action === 'View all roles') {
            await viewAllRoles();
        } else {
            console.log(`unknown action ${action}`);
        }
    }
}

main();