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

const viewAllDepartments = () => {
    console.log("viewAllDepartments");
    const queryString = 'SELECT * FROM department';
    const callback = (err, results, fields) => {
        trash = err;
        trash = fields;
        console.log("");
        console.log(results);
    }
    connection.query(queryString, callback);
}

const viewAllEmployees = () => {
    console.log("viewAllEmployees");
    const queryString = 'SELECT * FROM employee';
    const callback = (err, results, fields) => {
        trash = err;
        trash = fields;
        console.log("");
        console.log(results);
    }
    connection.query(queryString, callback);
}

const viewAllRoles = () => {
    console.log("viewAllRoles");
    const queryString = 'SELECT * FROM role';
    const callback = (err, results, fields) => {
        trash = err;
        trash = fields;
        console.log("");
        console.log(results);
    }
    connection.query(queryString, callback);
}

const main = async () => {

    while(true) {
        console.log("");
        console.log("");
        const prompt = {
            type: 'list',
            name: 'action',
            message: 'what now?',
            choices: [
                'View all departments',
                'View all employees',
                'View all roles',
            ],
        };

        const promise = inquirer.prompt([prompt]);
        const answer = await promise;
        const action = answer.action;

        if (action === 'View all departments') {
            viewAllDepartments();
        } else if (action === 'View all employees') {
            viewAllEmployees();
        } else if (action === 'View all roles') {
            viewAllRoles();
        } else {
            console.log(`unknown action ${action}`);
        }
    }
}

main();