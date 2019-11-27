create user if not exists 'test_user'@'localhost' identified by 'test_code';
grant all privileges on test_db.* to 'test_user'@'localhost';