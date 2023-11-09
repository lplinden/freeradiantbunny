CREATE SEQUENCE public.coin_prices_id_seq
1;2c    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_prices_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_prices (
    id integer DEFAULT nextval('public.coin_prices_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    source_url text,
    cmc_coin_id integer,
    last_updated timestamp with time zone,
    quote_denominator character varying(10),
    price numeric(20,10),
    volume_24h numeric(30,8),
    percent_change_1h numeric(7,3),
    percent_change_24h numeric(7,3),
    percent_change_7d numeric(7,3),
    volume_change_24h numeric(7,3),
    cmc_rank integer,
    name text,
    baseline text,
    run_count integer,
    run_slice double precision,
    was text,
    target text,
    chg text,
    chg_trades text,
    trade_balance text,
    now text,
    big integer,
    vlf integer
);

ALTER TABLE public.coin_prices OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_prices
    ADD CONSTRAINT coin_prices_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_prices
    ADD CONSTRAINT coin_prices_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_prices
    ADD CONSTRAINT coin_prices_coins_symbol_last_updated_quote_denominator_unique UNIQUE (coins_symbol, last_updated, quote_denominator);
