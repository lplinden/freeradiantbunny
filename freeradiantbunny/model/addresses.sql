CREATE SEQUENCE public.addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.addresses_id_seq OWNER TO freerad2_special;

CREATE TABLE public.addresses (
    id integer DEFAULT nextval('public.addresses_id_seq'::regclass) NOT NULL,
    coins_symbol character varying(10) NOT NULL,
    name text,
    address text
);

ALTER TABLE public.addresses OWNER TO freerad2_special;

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_coins_symbol_fk FOREIGN KEY (coins_symbol) REFERENCES public.coins(symbol);
