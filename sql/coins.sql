CREATE SEQUENCE public.coins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coins_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coins (
    id integer DEFAULT nextval('public.coins_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    symbol character varying(10) NOT NULL,
    volume text,
    watch text,
    stablecoin text,
    ath text,
    type text,
    risk text,
    platform text,
    url text,
    frb text,
    stage text,
    signal_level text,
    uuid text,
    notes text,
    price_epoch numeric(20,10),
    volume_24h_epoch bigint,	
    approved boolean
);

ALTER TABLE public.coins OWNER TO freerad2_special;

ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_symbol_unique UNIQUE (symbol);
