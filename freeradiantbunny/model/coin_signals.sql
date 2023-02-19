CREATE SEQUENCE public.coin_signals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_signals_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_signals (
    id integer DEFAULT nextval('public.coin_signals_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    coin_evaluations_id integer,
    last_updated_buy timestamp with time zone,
    price_buy numeric(20,10),
    units text,
    last_updated_sell timestamp with time zone,
    price_sell numeric(20,10),
    signal_duration text,
    profit_or_loss numeric(20,10),
    trade_completed text
);

ALTER TABLE public.coin_signals OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_signals
    ADD CONSTRAINT coin_signals_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_signals
    ADD CONSTRAINT coin_signals_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_signals
    ADD CONSTRAINT coin_signals_coin_evaluations_id_fk FOREIGN KEY (coin_evaluations_id) REFERENCES public.coin_evaluations(id);

ALTER TABLE ONLY public.coin_signals
    ADD CONSTRAINT coin_signals_coins_symbol_last_updated_buy_unique UNIQUE (coins_symbol, last_updated_buy);
