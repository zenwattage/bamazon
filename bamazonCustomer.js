var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Snowba1!T055",
    database: "bamazon_db"
  });



function mainControl() {
    inquirer
        .prompt([
            {
                type: "checkbox",
                message: "Choose an item",
                choices: [{ name: 'BEVERAGES'}, { name: 'SHOES'}],
                name: "choice"
            }
        ]).then(function (inquirerResponse) {
            if (inquirerResponse.choice == "BEVERAGES") {
                getBeverages();
            } else if (inquirerResponse.choice == "SHOES") {
                getShoes();
            }
        });
}