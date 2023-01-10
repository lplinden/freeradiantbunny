CREATE SEQUENCE public.coin_candlesticks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_candlesticks_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_candlesticks (
    id integer DEFAULT nextval('public.coin_candlesticks_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    timestamptz timestamp with time zone,
    period character varying(12),
    open numeric(12,6),
    high numeric(12,6),
    low numeric(12,6),
    close numeric(12,6),
    volume numeric(12,6),
    name text
);

ALTER TABLE public.coin_candlesticks OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_candlesticks
    ADD CONSTRAINT coin_candlesticks_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_candlesticks
    ADD CONSTRAINT coin_candlesticks_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);
