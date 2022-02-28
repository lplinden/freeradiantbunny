CREATE SEQUENCE public.moneymaker_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.moneymaker_id_seq OWNER TO freerad2_special;

CREATE TABLE public.moneymakers (
    id integer DEFAULT nextval('public.moneymaker_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    dirt text
);

ALTER TABLE public.moneymakers OWNER TO freerad2_special;
