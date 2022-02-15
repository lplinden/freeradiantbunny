CREATE SEQUENCE public.plant_alias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.plant_alias_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_aliases (
    id integer DEFAULT nextval('public.plant_alias_id_seq'::regclass) NOT NULL,
    plant_id integer,
    name text
);


ALTER TABLE public.plant_aliases OWNER TO freerad2_special;
