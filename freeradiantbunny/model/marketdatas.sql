CREATE SEQUENCE public.marketdatas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.marketdatas_id_seq OWNER TO freerad2_special;

CREATE TABLE public.marketdatas (
    id integer DEFAULT nextval('public.marketdatas_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    circulating_supply text,
    ma10 text,
    ma30 text,
    price text,
    market_cap text,
    volume text,
    market_count text,
    stage text,
    rank text,
    date_of_record text,
    ma12 text,
    ma26 text,
    exchange text
);

ALTER TABLE public.marketdatas OWNER TO freerad2_special;

ALTER TABLE ONLY public.marketdatas
    ADD CONSTRAINT marketdatas_pk PRIMARY KEY (id);
