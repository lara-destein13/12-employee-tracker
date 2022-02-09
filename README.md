# 12-employee-tracker

## Description

12-employee-tracker is a command line application and a a content management system (CMS) that allows users to manage a company's employee database. 

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 


## Built With

* Node.js
* MySQL2 package
* Inquirer package
* console.table package


## Usage

Application runs in the command line. Users will need to clone the repository code then in the terminal run `mysql -u root` and then run `source initialize.sql`. In a separate terminal window cd into the correct directory and run `node index.js`. This will prompt you with a list of options that you can navigate thorugh using the arrow keys. You can choose to add a department, add an employee, add a role, update an emplyee's role, view all departments, view all employees, or view all roles. 

See link to a walkthorugh video:https://watch.screencastify.com/v/f5yFgcLdqm28DAZoufzS


## Contributing
Made with &hearts; by Lara DeStein
