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
        message: 'Department Name:',
    };

    const promise = inquirer.prompt([prompt]);
    const answer = await promise;
    const department = answer.department;
    const query = `INSERT INTO department (name) VALUES ('${department}')`;
    const results = await runQuery(query);
};

// get all departments
const getAllDepartments = async () => {
    const query =`SELECT * FROM department`;
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
            name: 'title',
            message: 'Title',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Salary',
        },
        {
            type: 'list',
            name: 'departmentName',
            message: 'Department',
            choices: departmentNames,
        },
    ];

    const promise = inquirer.prompt(prompts);
    const answer = await promise;
    const title = answer.title;
    const salary = answer.salary;
    const departmentName = answer.departmetnName;

    let departmentId = 0;
    for (let i = 0; i < departments.length; i++) {
        const department = departments[i];
        if (department.name === departmentName) {
            departmentId = departmetn.id;
        }
    }

    const query = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${departmentId})`;
    const results = await runQuery(query);

};

// run query
const runQuery = async (query) => {
    console.log(`query: ${query}`);
    promise = new Promise((resolve,reject) => {
        const callback = (err, results, fields) => {
            if (err !== null) {
                console.log(`err: ${err}`);
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
                'Add a role',
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
        } else if (action === 'Add a role') {
            await addRole();
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