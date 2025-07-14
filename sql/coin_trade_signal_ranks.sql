CREATE SEQUENCE public.coin_trade_signal_ranks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_trade_signal_ranks_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_trade_signal_ranks (
    id integer DEFAULT nextval('public.coin_trade_signal_ranks_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10),
    posted_time timestamp with time zone,
    rank integer
);

ALTER TABLE public.coin_trade_signal_ranks OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_trade_signal_ranks
    ADD CONSTRAINT coin_trade_signal_ranks_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_trade_signal_ranks
    ADD CONSTRAINT coin_trade_signal_ranks_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_trade_signal_ranks
    ADD CONSTRAINT coin_trade_signal_ranks_coins_symbol_etc__unique UNIQUE (coins_symbol, quote_denominator, posted_time);
