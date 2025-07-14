CREATE SEQUENCE public.coin_trades_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_trades_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_trades (
    id integer DEFAULT nextval('public.coin_trades_id_seq'::regclass) NOT NULL,
    posted_time timestamp with time zone,
    buy_symbol text,
    buy_amount text,
    sell_symbol text,
    sell_amount text,
    pair_price text,
    fee text,
    status text
);

ALTER TABLE public.coin_trades OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_trades
    ADD CONSTRAINT coin_trades_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_trades
    ADD CONSTRAINT coin_trades_buy_symbol_fk FOREIGN KEY (buy_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_trades
    ADD CONSTRAINT coin_trades_sell_symbol_fk FOREIGN KEY (sell_symbol) REFERENCES public.coins(symbol);
