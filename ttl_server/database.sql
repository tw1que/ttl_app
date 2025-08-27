CREATE DATABASE jwtAuth;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
)

INSERT INTO users (
    user_name,
    user_password
) VALUES (
    'test_user_001',
    'password_001'
);

CREATE TABLE orders (
    order_id VARCHAR(255) NOT NULL PRIMARY KEY,
);

CREATE TABLE lot_numbers (
    lot_id VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE order_lot (
  order_id    VARCHAR(255) REFERENCES orders (order_id) ON UPDATE CASCADE ON DELETE CASCADE
, lot_id VARCHAR(255) REFERENCES consumables (lot_id) ON UPDATE CASCADE
, CONSTRAINT order_consumable_pkey PRIMARY KEY (order_id, lot_id)
);

ALTER TABLE orders DROP COLUMN (order_number, client_id);