CREATE SEQUENCE public.keyword_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.keyword_id_seq OWNER TO freerad2_special;

CREATE TABLE public.keywords (
    id integer DEFAULT nextval('public.keyword_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text
);

ALTER TABLE public.keywords OWNER TO freerad2_special;
