CREATE TABLE coin_audit (
    id SERIAL PRIMARY KEY,
    coins_symbol TEXT,
    price NUMERIC(18, 8),
    inserted_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
