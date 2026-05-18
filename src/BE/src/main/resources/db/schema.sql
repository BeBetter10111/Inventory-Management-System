-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema inventory_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema inventory_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inventory_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `inventory_db` ;

-- -----------------------------------------------------
-- Table `inventory_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`user` (
  `User_ID` VARCHAR(36) NOT NULL,
  `Username` VARCHAR(100) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Fullname` VARCHAR(200) NULL DEFAULT NULL,
  `PhoneNumber` VARCHAR(20) NULL DEFAULT NULL,
  `Email` VARCHAR(150) NULL DEFAULT NULL,
  `Status` ENUM('Active', 'Pending', 'Disabled') NOT NULL DEFAULT 'Pending',
  `Role` ENUM('Admin', 'Staff') NOT NULL DEFAULT 'Staff',
  PRIMARY KEY (`User_ID`),
  UNIQUE INDEX `Username` (`Username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`activity_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`activity_log` (
  `Activity_ID` VARCHAR(36) NOT NULL,
  `User_ID` VARCHAR(36) NOT NULL,
  `Description` TEXT NULL DEFAULT NULL,
  `Type` ENUM('AdjustSupplier', 'AdjustCategory', 'AdjustProduct', 'ModifyUser', 'Import', 'Export') NOT NULL,
  PRIMARY KEY (`Activity_ID`),
  INDEX `User_ID` (`User_ID` ASC) VISIBLE,
  CONSTRAINT `activity_log_ibfk_1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `inventory_db`.`user` (`User_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`buyer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`buyer` (
  `User_ID` VARCHAR(36) NOT NULL,
  `Name` VARCHAR(200) NULL DEFAULT NULL,
  `Address` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`User_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`category` (
  `Category_ID` VARCHAR(36) NOT NULL,
  `Category_name` VARCHAR(200) NULL DEFAULT NULL,
  `Unit` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`Category_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`product` (
  `Product_ID` VARCHAR(36) NOT NULL,
  `Product_name` VARCHAR(200) NULL DEFAULT NULL,
  `Description` TEXT NULL DEFAULT NULL,
  `Price` LONGTEXT NULL DEFAULT NULL,
  `Stock_quantity` INT NULL DEFAULT NULL,
  `Category_ID` VARCHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`Product_ID`),
  INDEX `Category_ID` (`Category_ID` ASC) VISIBLE,
  CONSTRAINT `product_ibfk_1`
    FOREIGN KEY (`Category_ID`)
    REFERENCES `inventory_db`.`category` (`Category_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`supplier` (
  `Supplier_ID` VARCHAR(36) NOT NULL,
  `Supplier_name` VARCHAR(200) NULL DEFAULT NULL,
  `Contact` VARCHAR(100) NULL DEFAULT NULL,
  `Address` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`Supplier_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`transaction` (
  `Transaction_ID` VARCHAR(36) NOT NULL,
  `Type` ENUM('Import', 'Export') NULL DEFAULT NULL,
  `Date` DATE NULL DEFAULT NULL,
  `User_ID` VARCHAR(36) NULL DEFAULT NULL,
  `Supplier_ID` VARCHAR(36) NULL DEFAULT NULL,
  `Buyer_Name` VARCHAR(200) NULL DEFAULT NULL,
  `Note` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`Transaction_ID`),
  INDEX `User_ID` (`User_ID` ASC) VISIBLE,
  INDEX `Supplier_ID` (`Supplier_ID` ASC) VISIBLE,
  CONSTRAINT `transaction_ibfk_1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `inventory_db`.`user` (`User_ID`),
  CONSTRAINT `transaction_ibfk_2`
    FOREIGN KEY (`Supplier_ID`)
    REFERENCES `inventory_db`.`supplier` (`Supplier_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `inventory_db`.`transaction_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_db`.`transaction_detail` (
  `Transaction_ID` VARCHAR(36) NOT NULL,
  `Product_ID` VARCHAR(36) NOT NULL,
  `Quantity` INT NULL DEFAULT NULL,
  `UnitPrice` ENUM('USD', 'VND') NULL DEFAULT NULL,
  PRIMARY KEY (`Transaction_ID`, `Product_ID`),
  INDEX `Product_ID` (`Product_ID` ASC) VISIBLE,
  CONSTRAINT `transaction_detail_ibfk_1`
    FOREIGN KEY (`Transaction_ID`)
    REFERENCES `inventory_db`.`transaction` (`Transaction_ID`),
  CONSTRAINT `transaction_detail_ibfk_2`
    FOREIGN KEY (`Product_ID`)
    REFERENCES `inventory_db`.`product` (`Product_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

USE `inventory_db` ;

-- -----------------------------------------------------
-- procedure sp_Login
-- -----------------------------------------------------

DELIMITER $$
USE `inventory_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Login`(
    IN p_username VARCHAR(100)
)
BEGIN
    SELECT User_ID, Username, Password, Fullname, PhoneNumber, Email, Role, Status
    FROM   USER
    WHERE  Username = p_username
      AND  Status   = 'Active'
    LIMIT 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_SignUp
-- -----------------------------------------------------

DELIMITER $$
USE `inventory_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_SignUp`(
    IN  p_user_id   VARCHAR(36),
    IN  p_username  VARCHAR(100),
    IN  p_password  VARCHAR(255),
    IN  p_fullname  VARCHAR(200),
    IN  p_phone     VARCHAR(20),
    IN  p_email     VARCHAR(150),
    IN  p_role      ENUM('Admin', 'Staff'),
    OUT p_status    VARCHAR(50),
    OUT p_message   VARCHAR(255)
)
sp_main: BEGIN
    DECLARE v_count INT DEFAULT 0;
    -- Kiểm tra username đã tồn tại chưa
    SELECT COUNT(*) INTO v_count FROM USER WHERE Username = p_username;
    IF v_count > 0 THEN
        SET p_status  = 'USERNAME_TAKEN';
        SET p_message = 'Tên đăng nhập đã được sử dụng.';
        LEAVE sp_main;
    END IF;
    -- Thêm user mới
    INSERT INTO USER (User_ID, Username, Password, Fullname, PhoneNumber, Email, Status, Role)
    VALUES (p_user_id, p_username, p_password, p_fullname, p_phone, p_email, 'Active', p_role);

    SET p_status  = 'SUCCESS';
    SET p_message = 'Đăng ký thành công.';
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
