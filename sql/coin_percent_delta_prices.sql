CREATE SEQUENCE public.coin_percent_delta_prices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_percent_delta_prices_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_percent_delta_prices (
    id integer DEFAULT nextval('public.coin_percent_delta_prices_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10),
    last_updated timestamp with time zone,
    time_previous timestamp with time zone,
    span numeric(3,1),
    percent_delta_price numeric(20,10)
);

ALTER TABLE public.coin_percent_delta_prices OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_percent_delta_prices
    ADD CONSTRAINT coin_percent_delta_prices_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_percent_delta_prices
    ADD CONSTRAINT coin_percent_delta_prices_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);
