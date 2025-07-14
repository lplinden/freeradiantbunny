CREATE SEQUENCE public.coin_rsi_strategy_level_crosses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_rsi_strategy_level_crosses_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_rsi_strategy_level_crosses (
    id integer DEFAULT nextval('public.coin_rsi_strategy_level_crosses_id_seq'::regclass) NOT NULL,
    posted_time timestamp with time zone,
    coin_symbol character varying(10) NOT NULL,
    rsi_strategy_level_cross_name text
);

ALTER TABLE public.coin_rsi_strategy_level_crosses OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_rsi_strategy_level_crosses
    ADD CONSTRAINT coin_rsi_strategy_level_crosses_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_rsi_strategy_level_crosses
    ADD CONSTRAINT coin_rsi_strategy_level_crosses_symbol_fk FOREIGN KEY (coin_symbol) REFERENCES public.coins(symbol);
