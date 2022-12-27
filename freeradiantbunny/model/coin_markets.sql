CREATE SEQUENCE public.coin_markets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_markets_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_markets (
    id integer DEFAULT nextval('public.coin_markets_id_seq'::regclass) NOT NULL,
    coin_id integer,
    market_id integer
);

ALTER TABLE public.coin_markets OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_markets
    ADD CONSTRAINT coin_markets_pk PRIMARY KEY (id);
    
