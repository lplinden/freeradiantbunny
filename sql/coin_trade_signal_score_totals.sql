CREATE SEQUENCE public.coin_trade_signal_score_totals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_trade_signal_score_totals_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_trade_signal_score_totals (
    id integer DEFAULT nextval('public.coin_trade_signal_score_totals_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10) NOT NULL,
    time_0 timestamp with time zone,
    price_0 numeric(20,10),
    time_minus_1 timestamp with time zone,
    price_minus_1 numeric(20,10),
    score_total character varying(12),
    prediction character varying(12),
    actualization character varying(12),
    outcome character varying(20)
);

ALTER TABLE public.coin_trade_signal_score_totals OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_trade_signal_score_totals
    ADD CONSTRAINT coin_trade_signal_score_totals_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_trade_signal_score_totals
    ADD CONSTRAINT coin_trade_signal_score_totals_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_trade_signal_score_totals
    ADD CONSTRAINT coin_trade_signal_score_totals_coins_symbol_etc_unique UNIQUE (coins_symbol, quote_denominator, time_0);
