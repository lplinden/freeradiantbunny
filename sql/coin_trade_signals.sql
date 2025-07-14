CREATE SEQUENCE public.coin_trade_signals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_trade_signals_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_trade_signals (
    id integer DEFAULT nextval('public.coin_trade_signals_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10),
    last_updated timestamp with time zone,
    trade_signal_name_id integer,
    signal_data_value character varying(20),
    score character varying(10)
);

ALTER TABLE public.coin_trade_signals OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_trade_signals
    ADD CONSTRAINT coin_trade_signals_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_trade_signals
    ADD CONSTRAINT coin_trade_signals_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_trade_signals
    ADD CONSTRAINT coin_trade_signals_trade_signal_name_fk FOREIGN KEY (trade_signal_name_id) REFERENCES public.coin_trade_signal_names(id);
