USE `inventory_management_system`;

INSERT INTO `user` (user_id, username, password, full_name, phone_number, email, status_type, role_type) VALUES
(UUID_TO_BIN("9b59ca79-c961-41c5-9d21-a3a3aa92da41"), "admin", "$2a$10$8KQLCCNU96QCvpbTLckKMu6VOr6hZv9mmi./Aj4gCvmg3F8Ocr/16", "John Doe", "+1-23-456-789", "johndoe@gmail.com", "Active", "Admin");