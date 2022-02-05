const inquirer = require('inquirer');
const mysql = require('mysql2');
let trash = null;
// const cTable = require('console.table');


// create the connection to the database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'employees'
});


// add department
const addDepartment = async () => {
    console.log('addDepartment');
};

// run query
const runQuery = async (query) => {
    promise = new Promise((resolve,reject) => {
        const callback = (err, results, fields) => {
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
    console.log('viewAllDepartments');
    const query = 'SELECT * FROM department';
    const results = await runQuery(query);
    console.log(results);
};


// view all employees
const viewAllEmployees = async () => {
    console.log("viewAllEmployees");
    const query = 'SELECT * FROM employee';
    const results = await runQuery(query);
    console.log(results);
};

// view all roles
const viewAllRoles = async () => {
    console.log("viewAllRoles");
    const query = 'SELECT * FROM role';
    const results = await runQuery(query);
    console.log(results);
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