CREATE TABLE Users (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    email          VARCHAR(255) UNIQUE NOT NULL,
    password       VARCHAR(255) NOT NULL, -- Hashed password
    nationality    VARCHAR(100), -- User's country
    level          ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Users (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    email          VARCHAR(255) UNIQUE NOT NULL,
    password       VARCHAR(255) NOT NULL, -- Hashed password
    nationality    VARCHAR(100), -- User's country
    level          ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
