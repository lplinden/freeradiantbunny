CREATE SEQUENCE public.coin_relative_strength_indexes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_relative_strength_indexes_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_relative_strength_indexes (
    id integer DEFAULT nextval('public.coin_relative_strength_indexes_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    period_rsi integer,
    rsi_value numeric(20,10),
    rsi_strategy_level character varying(20),
    rsi_cross_name character varying(20)
);

ALTER TABLE public.coin_relative_strength_indexes OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_relative_strength_indexes
    ADD CONSTRAINT coin_relative_strength_indexes_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_relative_strength_indexes
    ADD CONSTRAINT coin_relative_strength_indexes_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_relative_strength_indexes
    ADD CONSTRAINT coin_relative_strength_indexes_coins_symbol_etc_unique UNIQUE (coins_symbol, quote_denominator, last_updated, period_rsi);

