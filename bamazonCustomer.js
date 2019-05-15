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
    console.log("\n connected as id " + connection.threadId + "\n");
});

//FUNCTION TO DISPLAY ALL AVAILABLE ITEMS TO USER
// SELECT * FROM products
function displayAll() {
    //display all items in the products table
    var allQuery = "SELECT * FROM products";

    connection.query(allQuery, function (err, results) {
        if (err) throw err;
        console.log(results);

        //calling userPrompt function to get user order
        userPrompt();
    })
}//end displayALL function

//initial display call
displayAll();

//get desired itemID and itemQTY from the user
function userPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the ID of your desired item: ",
                name: "itemID"
            },
            {
                type: "input",
                message: "How many would you like? : ",
                name: "itemQTY"
            }
        ]).then(function (inquirerResponse) {
            //console.log(inquirerResponse.itemID);
            // if(inquirerResponse == null) {
            //     console.log("No Item of that ID exists, Try again");
            //     userPrompt();
            // }

            var itemID = inquirerResponse.itemID;
            var itemQTY = inquirerResponse.itemQTY;
            console.log(itemID);
            console.log(itemQTY);

            //pass itemID to getItemByID;
            getItemByID(itemID,itemQTY);
            //pass itemQTY to getItemQTY;

            //itemsRequested(itemID,itemQTY);

        });
}//END OF MAIN CONTROL FUNCTION




function getItemByID(id, qty) {
    connection.query("SELECT * FROM products WHERE item_id=" + id, function (err, res) {
        if (err) throw err;
        console.log(res);

        //if response is empty or negative
        //prompt for non empty or neg input
        
        
    });
}//end getItemByID function


//orderPrice = quantity * price