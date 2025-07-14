CREATE SEQUENCE public.coin_stack_patterns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_stack_patterns_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_stack_patterns (
    id integer DEFAULT nextval('public.coin_stack_patterns_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10) NOT NULL,
    posted_time timestamp with time zone,
    stack_pattern character varying(20) NOT NULL
);

ALTER TABLE public.coin_stack_patterns OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_stack_patterns
    ADD CONSTRAINT coin_stack_patterns_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_stack_patterns
    ADD CONSTRAINT coin_stack_patterns_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);

ALTER TABLE ONLY public.coin_stack_patterns
    ADD CONSTRAINT coin_stack_patterns_coins_symbol_posted_time_etc_unique UNIQUE (coins_symbol, quote_denominator, posted_time);

