CREATE SEQUENCE public.plant_unit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.plant_unit_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_units (
    id integer DEFAULT nextval('public.plant_unit_id_seq'::regclass) NOT NULL,
    plant_id integer,
    unit_id integer
);

ALTER TABLE public.plant_units OWNER TO freerad2_special;
