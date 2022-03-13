CREATE SEQUENCE public.market_id_seq
    START WITH 15
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.market_id_seq OWNER TO freerad2_special;

CREATE TABLE public.markets (
    id integer DEFAULT nextval('public.market_id_seq'::regclass) NOT NULL,
    name text,
    img_url text,
    description text,
    sort character varying(12),
    status text,
    url text,
    api text
);

ALTER TABLE public.markets OWNER TO freerad2_special;
