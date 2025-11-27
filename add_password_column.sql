-- Add password column to signup_users table
USE workfair;

-- Add password column if it doesn't exist
ALTER TABLE signup_users 
ADD COLUMN IF NOT EXISTS password VARCHAR(255) NULL COMMENT '비밀번호 (해시값)' 
AFTER email;

-- Show updated table structure
DESC signup_users;

SELECT 'Password column added successfully!' as message;

