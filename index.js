const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const cTable = require('console.table');

const viewAllDepartments = () => {
    console.log('viewAllDepartments');
}

const viewAllEmployees = () => {
    console.log('viewAllEmployees');
}

const viewAllRoles = () => {
    console.log('viewAllRoles');
}

const main = async () => {

    while(true) {
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