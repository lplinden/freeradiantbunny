CREATE SEQUENCE public.plant_family_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.plant_family_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_families (
    id integer DEFAULT nextval('public.plant_family_id_seq'::regclass) NOT NULL,
    name text
);


ALTER TABLE public.plant_families OWNER TO freerad2_special;
