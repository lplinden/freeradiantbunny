CREATE SEQUENCE public.coin_markets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_markets_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_markets (
    id integer DEFAULT nextval('public.coin_markets_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    markets_id integer
);

ALTER TABLE public.coin_markets OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_markets
    ADD CONSTRAINT coin_markets_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_markets
    ADD CONSTRAINT coin_markets_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_markets
    ADD CONSTRAINT coin_markets_markets_id_fk FOREIGN KEY (markets_id) REFERENCES public.markets(id);
