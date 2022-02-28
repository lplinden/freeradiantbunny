CREATE SEQUENCE public.soil_area_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.soil_area_id_seq OWNER TO freerad2_special;

CREATE TABLE public.soil_areas (
    id integer DEFAULT nextval('public.soil_area_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    bed_id integer NOT NULL,
    sort text,
    status text,
    description text,
    img_url text,
    dimensions text
);

ALTER TABLE public.soil_areas OWNER TO freerad2_special;
