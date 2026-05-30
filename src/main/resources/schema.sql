DROP DATABASE IF EXISTS `inventory_management_system`;
CREATE DATABASE `inventory_management_system`;

USE `inventory_management_system`;

CREATE TABLE `user` (
    `user_id` BINARY(16) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `full_name` VARCHAR(200) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `role_type` ENUM('Admin', 'Staff') NOT NULL,
    `status_type` ENUM('Active', 'Disabled', 'Pending') NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`user_id`),
    UNIQUE (`email`),
    UNIQUE (`phone_number`),
    UNIQUE (`username`)
);

CREATE TABLE `activity_log` (
    `activity_id` BINARY(16) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `timestamp` DATETIME(6) NOT NULL,
    `type` ENUM('AdjustCategory', 'AdjustProduct', 'AdjustSupplier', 'AdjustBuyer', 'ModifyUser', 'Transaction') NOT NULL,
    `user_id` BINARY(16) NOT NULL,

    PRIMARY KEY (`activity_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `buyer` (
    `buyer_id` BINARY(16) NOT NULL,
    `address` VARCHAR(300) NOT NULL,
    `full_name` VARCHAR(200) UNIQUE NOT NULL,

    PRIMARY KEY (`buyer_id`)
);

CREATE TABLE `category` (           
    `category_id` BINARY(16) NOT NULL,
    `category_name` VARCHAR(200) UNIQUE NOT NULL,
    `unit` VARCHAR(50)  UNIQUE NOT NULL,

    PRIMARY KEY (`category_id`),
    UNIQUE KEY `unique_category_unit` (`category_name`, `unit`) -- Fixes duplicates
);

CREATE TABLE `product` (
    `product_id` BINARY(16) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` DOUBLE NOT NULL,
    `product_name` VARCHAR(200) NOT NULL,
    `stock_quantity` INT NOT NULL,
    `category_id` BINARY(16) NOT NULL,

    PRIMARY KEY (`product_id`),
    FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
    UNIQUE KEY (`product_name`, `category_id`)
);

CREATE TABLE `supplier` (
    `supplier_id` BINARY(16) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `contact` VARCHAR(255) NOT NULL,
    `supplier_name` VARCHAR(255) UNIQUE NOT NULL,

    PRIMARY KEY (`supplier_id`)
);

CREATE TABLE `transaction` (
    `transaction_id` BINARY(16) NOT NULL,
    `date` DATE NOT NULL,
    `note` VARCHAR(255) DEFAULT NULL,
    `type` ENUM('Export', 'Import') NOT NULL,
    `buyer_id` BINARY(16) DEFAULT NULL,
    `supplier_id` BINARY(16) DEFAULT NULL,
    `user_id` BINARY(16) NOT NULL,

    PRIMARY KEY (`transaction_id`),
    FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`buyer_id`),
    FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `transaction_detail` (
    `detail_id` BINARY(16) NOT NULL,
    `quantity` INT NOT NULL,
    `unit_price_type` ENUM('USD', 'VND') NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `transaction_id` BINARY(16) NOT NULL,

    PRIMARY KEY (`detail_id`),
    FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
);
