require("dotenv").config();
var keys = require("./keys.js");

var inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        name: "task",
        message: "What would you like to do?",
    }
]).then(function(inquirerResponse){
    console.log(inquirerResponse.task);
})