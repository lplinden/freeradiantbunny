CREATE SEQUENCE public.deposit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.deposit_id_seq OWNER TO freerad2_special;

CREATE TABLE public.deposits (
    id integer DEFAULT nextval('public.deposit_id_seq'::regclass) NOT NULL,
    name text,
    amount text,
    coin_id integer,
    delegation_id integer,
    tx_hash text,
    tx_fee text,
    scan_url text
);

ALTER TABLE public.deposits OWNER TO freerad2_special;
