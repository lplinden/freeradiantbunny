CREATE SEQUENCE public.coin_moving_average_crosses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_moving_average_crosses_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_moving_average_crosses (
    id integer DEFAULT nextval('public.coin_moving_average_crosses_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    cross_details character varying(4)
);

ALTER TABLE public.coin_moving_average_crosses OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_moving_average_crosses
    ADD CONSTRAINT coin_moving_average_crosses_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_moving_average_crosses
    ADD CONSTRAINT coin_moving_average_crosses_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);
