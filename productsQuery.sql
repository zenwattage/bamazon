DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id	INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price INT UNSIGNED,
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 'Cucumber Melon LaCroix', 'Beverage', 1.25, 500),
		(2, 'Pamplemousse LaCroix', 'Beverage', 1.15, 300),
        (3, 'Lime LaCroix', 'Beverage', 1.00, 250),
        (4, 'Key Lime LaCroix', 'Beverage', 1.05, 250),
        (5, 'Lemon LaCroix', 'Beverage', 1.05, 50),
        (6, 'Mango LaCroix', 'Beverage', 1.05, 50),
        (7, 'Peach-Pear LaCroix', 'Beverage', 1.05, 20),
        (8, 'Orange LaCroix', 'Beverage', 1.05, 65),
        (9, 'Passionfruit LaCroix', 'Beverage', 1.05, 25),
        (10, 'Berry LaCroix', 'Beverage', 1.05, 250),
        (11, 'Chuck Taylors', 'Shoes', 48.40, 150),
        (12, 'Reebok Pumps', 'Shoes', 95.00, 10),
        (13, 'Jordans', 'Shoes', 160, 5)
;


SELECT * FROM products;