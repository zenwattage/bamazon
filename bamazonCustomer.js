var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    
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

    //initial display call
    displayAll();
});

//FUNCTION TO DISPLAY ALL AVAILABLE ITEMS TO USER
function displayAll() {
    //display all items in the products table
    var allQuery = "SELECT * FROM products";

    connection.query(allQuery, function (err, results) {
        if (err) throw err;
        console.log(results);
        //calling userPrompt function to get user order
        console.log("=====================================");

        userPrompt();

    })//end of connection query
}//end displayALL function


//get desired itemID and itemQTY from the user
function userPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "\nEnter the ID of your desired item: ",
                name: "itemID"
            },
            {
                type: "input",
                message: "\nHow many would you like? : ",
                name: "itemOrderQTY"
            }
        ]).then(function (inquirerResponse) {
            var itemID = inquirerResponse.itemID;
            var itemOrderQTY = inquirerResponse.itemOrderQTY;

            getItemByID(itemID, itemOrderQTY);
        });//end of inquirer prompt
}//END OF MAIN CONTROL FUNCTION


function getItemByID(id, orderQty) {
    var idQuery = "SELECT * FROM products WHERE item_id=" + id;

    connection.query(idQuery, function (err, res) {
        if (err) throw err;
        console.log("")
        console.log(res);

        var price = res[0].price;
        var itemId = res[0].item_id;
        var itemStockQty = res[0].stock_quantity;

        if (orderQty <= itemStockQty) {
            console.log("\n No problem we have plenty! \n");
            //update table
            function updateTable(itemId, newQty) {
                //update table by subtracting newQty from stock_quantity
                //show total cost of purchase
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: newQty,
                    },
                    {
                        item_id: itemId
                    }
                ], function (err, res) {
                    var totalPrice = price * orderQty;
                    console.log("=====================================");
                    console.log("Table updated!\n");
                    console.log("\n Your total is: $" + totalPrice);
                    console.log("=====================================");

                    //display all items in the products table
                    var allQuery = "SELECT * FROM products";

                    connection.query(allQuery, function (err, results) {
                        if (err) throw err;
                        console.log(results);
                        //calling userPrompt function to get user order
                        console.log("=====================================");

                    })//end of connection query

                    connection.end();
                })
            };
            updateTable(itemId, orderQty);

        } else if (orderQty > itemStockQty) {
            console.log("\nSorry we dont have that many to sell \n");
            userPrompt();
        } else {
            console.log("\nSorry that input was not understood");
        };

    });//end of connection query
}//end getItemByID function







