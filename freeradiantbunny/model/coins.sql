CREATE SEQUENCE public.coin_id_seq
    START WITH 205
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.coin_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coins (
    id integer DEFAULT nextval('public.coin_id_seq'::regclass) NOT NULL,
    ticker text NOT NULL,
    name text,
    volume text,
    watch text,
    sort text,
    stablecoin text,
    ath text,
    type text,
    risk text,
    platform text,
    url text,
    frb text,
    img_url text,
    description text,
    status text,
    stage text,
    signal_level text,
    uuid text,
    notes text,
    recent text,
    change text
);

ALTER TABLE public.coins OWNER TO freerad2_special;

ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coin_id_pkey PRIMARY KEY (id);
