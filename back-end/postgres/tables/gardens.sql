BEGIN TRANSACTION;

CREATE TABLE gardens (
    garden_id BIGSERIAL PRIMARY KEY,
    user_id INT references users(id),
    garden_length NUMERIC(6,2) DEFAULT 0 NOT NULL,
    garden_width NUMERIC(6,2) DEFAULT 0 NOT NULL
);

COMMIT;