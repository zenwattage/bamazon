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
    //start();
    
    console.log("\n connected as id " + connection.threadId + "\n");
    
});

//console.log(connection);

//hold user itemID
var itemID = "";
//hold user QTY
var userQty = "";

//FUNCTION TO DISPLAY ALL AVAILABLE ITEMS TO USER
// SELECT * FROM products
function displayAll() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) throw err;
        console.log(results);

        firstUserPrompt();
    })
}//end displayALL function

displayAll();

function getItemByID(id) {
connection.query("SELECT * FROM products WHERE item_id="+ id, function(err,res) {
    if(err) throw err;
    console.log(res);

    connection.end();
})
}//end getItemByID function



function firstUserPrompt() {
    inquirer
        .prompt(
            {
                type: "input",
                message: "Enter the ID of your desired item: ",
                name: "itemID"
            }
        ).then(function (inquirerResponse) {
            //console.log(inquirerResponse.itemID);
            itemID  += inquirerResponse.itemID;
            console.log(itemID);

            //call next question prompt

            secondUserPrompt();
           //pass itemID into product query
            // getItemByID(itemID);
        });
}//END OF MAIN CONTROL FUNCTION


function secondUserPrompt() {
    inquirer
        .prompt(
            {
                type: "input",
                message: "How many would you like? ",
                name: "userQty"
            }
        ).then(function (inquirerResponse) {
            userQty += inquirerResponse.userQty;
            //console.log(userQty);
            getItemQTY();
        });
}// end second userprompt

function getItemQTY() {
    connection.query("SELECT stock_quantity FROM products WHERE item_id=" + itemID, function(err,res) {
        if(err) throw(err);
        console.log(res);
        var currentAmount = res;
        console.log(currentAmount);
        console.log(userQty);

        if(currentAmount < userQty) {
            console.log('Not enough');
        } else if (currentAmount > userQty) {
            console.log("sure no problem");
        }


        connection.end();
    })
}//end getItemQTY function


// MAKE SURE TO ADD getItemByID function back in
