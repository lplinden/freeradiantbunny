CREATE SEQUENCE public.trade_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.trade_id_seq OWNER TO freerad2_special;

CREATE TABLE public.trades (
    id integer DEFAULT nextval('public.trade_id_seq'::regclass) NOT NULL,
    name text,
    img_url text,
    description text,
    sort character varying(12),
    status text,
    sample_num integer,
    market_id integer NOT NULL,
    coin_id integer NOT NULL,
    targets text,
    entrance text,
    stoploss text,
    size text,
    price text,
    explanation text,
    numeraire_coin_id text,
    risk_ratio text,
    transactions text
);

ALTER TABLE public.trades OWNER TO freerad2_special;
