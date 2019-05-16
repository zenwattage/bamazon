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


    //initial display call
    displayAll();
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
            //console.log(inquirerResponse.itemID);
            // if(inquirerResponse == null) {
            //     console.log("No Item of that ID exists, Try again");
            //     userPrompt();
            // }

            var itemID = inquirerResponse.itemID;
            var itemOrderQTY = inquirerResponse.itemOrderQTY;
            //console.log(itemID);
            //console.log(itemOrderQTY);

            //pass itemID to getItemByID;
            //pass itemOrderQTY to getItemQTY;
            getItemByID(itemID, itemOrderQTY);
        });//end of inquirer prompt
}//END OF MAIN CONTROL FUNCTION




function getItemByID(id, orderQty) {
    var idQuery = "SELECT * FROM products WHERE item_id=" + id;

    connection.query(idQuery, function (err, res) {
        if (err) throw err;
        console.log("")
        console.log(res);

        //if response is empty or negative
        //prompt for non empty or neg input
        //console.log(res[0].price);
        var price = res[0].price;
        var itemId = res[0].item_id;
        var itemStockQty = res[0].stock_quantity;

        var totalPrice = price * itemStockQty;

        if (orderQty <= itemStockQty) {
            console.log("\n No problem we have plenty! \n");


            //reduce itemStockQty by orderQty
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
                    console.log("=====================================");
                    console.log("Table updated!\n");
                    console.log("\n Your total is: $" + totalPrice);
                    console.log("=====================================");


                    //displayAll();
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

            // console.log("You asked for: " + orderQty +" of item: " + itemId + "\nThe total price of your order is: $" + totalPrice);

        } else if (orderQty > itemStockQty) {
            console.log("\nSorry we dont have that many to sell \n");
            //userPrompt();
        } else {
            console.log("\nSorry that input was not understood");
        };

    });//end of connection query
}//end getItemByID function







