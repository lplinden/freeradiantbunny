
CREATE OR REPLACE FUNCTION notify_coin_prices_trigger() RETURNS trigger AS $$
BEGIN
        PERFORM pg_notify('coin_prices_channel', NEW.coins_symbol || ':' || NEW.price);
	    RETURN NULL;
	    END;
	    $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_coin_price_audit ON coin_prices;

CREATE TRIGGER trg_coin_price_audit
AFTER INSERT ON coin_prices
FOR EACH ROW
EXECUTE FUNCTION notify_coin_prices_trigger();


