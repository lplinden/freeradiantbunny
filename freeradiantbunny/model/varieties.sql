CREATE SEQUENCE public.variety_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.variety_id_seq OWNER TO freerad2_special;

CREATE TABLE public.varieties (
    id integer DEFAULT nextval('public.variety_id_seq'::regclass) NOT NULL,
    plant_id integer NOT NULL,
    name text,
    description text
);

ALTER TABLE public.varieties OWNER TO freerad2_special;
