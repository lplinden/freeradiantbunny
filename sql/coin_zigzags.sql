CREATE SEQUENCE public.coin_zigzags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_zigzags_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_zigzags (
    id integer DEFAULT nextval('public.coin_zigzags_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    quote_denominator character varying(10) NOT NULL,
    price numeric(20,10),
    edge character varying(4) NOT NULL
);

ALTER TABLE public.coin_zigzags OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_zigzags
    ADD CONSTRAINT coin_zigzags_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coin_zigzags
    ADD CONSTRAINT coin_zigzags_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);
