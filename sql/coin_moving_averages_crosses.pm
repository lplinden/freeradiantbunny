CREATE SEQUENCE public.coin_moving_averages_crosses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_moving_averages_crosses_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_moving_averages_crosses (
    id integer DEFAULT nextval('public.coin_moving_averages_crosses_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    moving_average_measurement_fast numeric(20,10),
    moving_average_measurement_slow numeric(20,10),
    moving_averages_cross character varying(20) NOT NULL
);

ALTER TABLE public.coin_moving_averages_crosses OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_moving_averages_crosses
    ADD CONSTRAINT coin_moving_averages_crosses_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_moving_averages_crosses
    ADD CONSTRAINT coin_moving_averages_crosses_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_moving_averages_crosses
    ADD CONSTRAINT coin_moving_averages_crosses_coins_symbol_last_updated_unique UNIQUE (coins_symbol, quote_denominator, last_updated);

