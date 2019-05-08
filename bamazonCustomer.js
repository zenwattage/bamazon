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


  
// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
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



function getBeverages() {
    // SELECT * FROM products
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

    }).then(function(answer) {
        console.log(answer);
    })
}

function getShoes() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

    }).then(function(answer) {
        console.log(answer);
    })

}

mainControl();