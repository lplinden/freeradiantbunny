CREATE SEQUENCE public.coin_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_evaluations_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_evaluations (
    id integer DEFAULT nextval('public.coin_evaluations_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    last_updated timestamp with time zone,
    reasons text,
    conclusion text
);

ALTER TABLE public.coin_evaluations OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_evaluations
    ADD CONSTRAINT coin_evaluations_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_evaluations
    ADD CONSTRAINT coin_evaluations_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_evaluations
    ADD CONSTRAINT coin_evaluations_coins_symbol_last_updated_unique UNIQUE (coins_symbol, last_updated);
