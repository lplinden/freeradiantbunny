CREATE SEQUENCE public.deposits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.deposits_id_seq OWNER TO freerad2_special;

CREATE TABLE public.deposits (
    id integer DEFAULT nextval('public.deposits_id_seq'::regclass) NOT NULL,
    coin_id integer,
    delegation_id integer,
    name text,
    amount text,
    tx_hash text,
    tx_fee text,
    scan_url text
);

ALTER TABLE public.deposits OWNER TO freerad2_special;

ALTER TABLE ONLY public.deposits
    ADD CONSTRAINT deposits_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.deposits
    ADD CONSTRAINT deposits_coin_id_fk FOREIGN KEY (coin_id) REFERENCES public.coins(id);

ALTER TABLE ONLY public.deposits
    ADD CONSTRAINT deposits_delegation_id_fk FOREIGN KEY (delegation_id) REFERENCES public.delegations(id);
