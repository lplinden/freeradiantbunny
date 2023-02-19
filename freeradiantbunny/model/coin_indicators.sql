CREATE SEQUENCE public.coin_indicators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_indicators_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_indicators (
    id integer DEFAULT nextval('public.coin_indicators_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    signal_line text,
    measurement text,
    measurement_change text
);

ALTER TABLE public.coin_indicators OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_indicators
    ADD CONSTRAINT coin_indicators_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_indicators
    ADD CONSTRAINT coin_indicators_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_indicators
    ADD CONSTRAINT coin_indicators_coins_symbol_last_updated_measurement_unique UNIQUE (coins_symbol, last_updated, measurement);
