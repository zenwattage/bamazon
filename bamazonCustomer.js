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
connection.connect(function (err) {
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
var itemQty = "";



//FUNCTION TO DISPLAY ALL AVAILABLE ITEMS TO USER
// SELECT * FROM products
function displayAll() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
    })
}//end displayALL function

displayAll();



var userPrompts = {
    idPrompt: {
        type: "input",
        message: "Enter the ID of your desired item: ",
        name: "itemID"
    },
    qtyPrompt: {
        type: "input",
        message: "Enter the quantity you would like: ",
        name: "itemQTY"
    }
};//END OF USERPROMPT


function getItemByID(id) {
    connection.query("SELECT * FROM products WHERE item_id=" + id, function (err, res) {
        if (err) throw err;

        console.log(res);
        //connection.end();
    });
}//end getItemByID function




function getItemQTY() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (err);
        console.log("RESPONSE IS: " + JSON.stringify(res));
        var currentAmount = JSON.stringify(res.stock_quantity);
        itemQty += currentAmount;
        console.log(itemQty);
        console.log("Current stock amount is: " + currentAmount);

        // console.log("User wants to buy : " + userQty);

        // connection.end();
    })
}//end getItemQTY function


// MAKE SURE TO ADD getItemByID function back in


//orderPrice = quantity * price