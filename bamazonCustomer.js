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
                name: "itemOrderQTY"
            }
        ]).then(function (inquirerResponse) {
            //console.log(inquirerResponse.itemID);
            // if(inquirerResponse == null) {
            //     console.log("No Item of that ID exists, Try again");
            //     userPrompt();
            // }

            var itemID = inquirerResponse.itemID;
            var itemOrderQTY = inquirerResponse.itemOrderQTY;
            console.log(itemID);
            console.log(itemOrderQTY);

            //pass itemID to getItemByID;
            //pass itemOrderQTY to getItemQTY;
            getItemByID(itemID, itemOrderQTY);
        });
}//END OF MAIN CONTROL FUNCTION




function getItemByID(id, orderQty) {
    connection.query("SELECT * FROM products WHERE item_id=" + id, function (err, res) {
        if (err) throw err;
        console.log(res);

        //if response is empty or negative
        //prompt for non empty or neg input
        console.log(res[0].price);
        var price = res[0].price;
        var itemId = res[0].item_id;
        var itemStockQty = res[0].stock_quantity;

        if(itemStockQty <= orderQty){
            console.log("No problem we have plenty!");
        }

        var totalPrice = price * itemStockQty;

        console.log("You asked for: " + itemStockQty +" of item: " + itemId + " The total price of your order is: " + totalPrice);
        

    });
}//end getItemByID function


//orderPrice = quantity * price