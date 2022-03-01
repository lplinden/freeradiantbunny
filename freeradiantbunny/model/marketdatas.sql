CREATE SEQUENCE public.marketdata_id_seq
    START WITH 24
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.marketdata_id_seq OWNER TO freerad2_special;

CREATE TABLE public.marketdatas (
    id integer DEFAULT nextval('public.marketdata_id_seq'::regclass) NOT NULL,
    name text,
    sort character varying(12),
    status text,
    description text,
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
