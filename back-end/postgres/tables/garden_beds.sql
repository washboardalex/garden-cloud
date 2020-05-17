BEGIN TRANSACTION;

CREATE TABLE garden_beds (
    garden_bed_id BIGSERIAL PRIMARY KEY,
    user_id INT references users(id),
    bed_length NUMERIC(6,2) DEFAULT 0 NOT NULL,
    bed_width NUMERIC(6,2) DEFAULT 0 NOT NULL,
    left_position NUMERIC(6,2) DEFAULT 0 NOT NULL,
    top_position NUMERIC(6,2) DEFAULT 0 NOT NULL
);

COMMIT;