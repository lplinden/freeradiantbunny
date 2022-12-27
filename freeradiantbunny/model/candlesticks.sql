CREATE SEQUENCE public.candlesticks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.candlesticks_id_seq OWNER TO freerad2_special;

CREATE TABLE public.candlesticks (
    id integer DEFAULT nextval('public.candlesticks_id_seq'::regclass) NOT NULL,
    coin_ticker character varying(6),
    timestamptz timestamptz,
    period character varying(12),
    open decimal(12, 6),
    high decimal(12, 6),
    low decimal(12, 6),
    close decimal(12, 6),
    volume decimal(12, 6)
);

ALTER TABLE public.candlesticks OWNER TO freerad2_special;

ALTER TABLE ONLY public.candlesticks
    ADD CONSTRAINT candlesticks_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.candlesticks
    ADD CONSTRAINT candlesticks_coin_ticker_fk FOREIGN KEY (coin_ticker) REFERENCES public.coins(ticker);
