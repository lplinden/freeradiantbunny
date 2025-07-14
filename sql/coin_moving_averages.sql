CREATE SEQUENCE public.coin_moving_averages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_moving_averages_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_moving_averages (
    id integer DEFAULT nextval('public.coin_moving_averages_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    period character varying(4) NOT NULL,
    moving_average_measurement numeric(20,10)
);

ALTER TABLE public.coin_moving_averages OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_moving_averages
    ADD CONSTRAINT coin_moving_averages_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_moving_averages
    ADD CONSTRAINT coin_moving_averages_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_moving_averages
    ADD CONSTRAINT coin_moving_averages_coins_symbol_last_updated_unique UNIQUE (coins_symbol, quote_denominator, last_updated, period);

