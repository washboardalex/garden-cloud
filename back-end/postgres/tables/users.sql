BEGIN TRANSACTION;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email TEXT UNIQUE NOT NULL,
    garden_length NUMERIC(6,2) DEFAULT 0 NOT NULL, 
    garden_width NUMERIC(6,2) DEFAULT 0 NOT NULL,
    joined TIMESTAMP NOT NULL
);

COMMIT;