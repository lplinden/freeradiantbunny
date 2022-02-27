CREATE SEQUENCE public.land_bed_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.land_bed_id_seq OWNER TO freerad2_special;

CREATE TABLE public.land_beds (
    id integer DEFAULT nextval('public.land_bed_id_seq'::regclass) NOT NULL,
    soil_area_id integer,
    bed_num integer NOT NULL
);


ALTER TABLE public.land_beds OWNER TO freerad2_special;
