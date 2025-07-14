CREATE SEQUENCE public.coin_pair_prices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_pair_prices_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_pair_prices (
    id integer DEFAULT nextval('public.coin_pair_prices_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    quote_denominator character varying(10),
    last_updated_quote_denominator timestamp with time zone,
    pair_price numeric(20,10)
);

ALTER TABLE public.coin_pair_prices OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_pair_prices
    ADD CONSTRAINT coin_pair_prices_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_pair_prices
    ADD CONSTRAINT coin_pair_prices_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_pair_prices
    ADD CONSTRAINT coin_pair_prices_quote_denominator_fk FOREIGN KEY (quote_denominator) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_pair_prices
    ADD CONSTRAINT coin_pair_prices_coins_symbol_last_updated_quote_denominator_unique UNIQUE (coins_symbol, last_updated, quote_denominator);
