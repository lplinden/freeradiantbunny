CREATE SEQUENCE public.unit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.unit_id_seq OWNER TO freerad2_special;

CREATE TABLE public.units (
    id integer DEFAULT nextval('public.unit_id_seq'::regclass) NOT NULL,
    name text,
    description text
);

ALTER TABLE public.units OWNER TO freerad2_special;
