CREATE SEQUENCE public.coin_pumps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_pumps_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_pumps (
    id integer DEFAULT nextval('public.coin_pumps_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    price numeric(20,10),
    percent_change_1h numeric(7,3),
    percent_change_24h numeric(7,3),
    volume_percent_change_24h numeric(7,3)	
);

ALTER TABLE public.coin_pumps OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_pumps
    ADD CONSTRAINT coin_pumps_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_pumps
    ADD CONSTRAINT coin_pumps_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_pumps
    ADD CONSTRAINT coin_pumps_coins_symbol_last_updated_unique UNIQUE (coins_symbol, last_updated);

