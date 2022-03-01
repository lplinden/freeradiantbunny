CREATE SEQUENCE public.land_farmer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.land_farmer_id_seq OWNER TO freerad2_special;

CREATE TABLE public.land_farmers (
    id integer DEFAULT nextval('public.land_farmer_id_seq'::regclass) NOT NULL,
    soil_area_id integer,
    farmer text
);

ALTER TABLE public.land_farmers OWNER TO freerad2_special;
