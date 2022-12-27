CREATE SEQUENCE public.land_beds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.land_beds_id_seq OWNER TO freerad2_special;

CREATE TABLE public.land_beds (
    id integer DEFAULT nextval('public.land_beds_id_seq'::regclass) NOT NULL,
    bed_num integer NOT NULL,
    soil_area_id integer
);

ALTER TABLE public.land_beds OWNER TO freerad2_special;

ALTER TABLE ONLY public.land_beds
    ADD CONSTRAINT land_beds_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.land_beds
    ADD CONSTRAINT land_beds_soil_areas_id_fk FOREIGN KEY (soil_area_id) REFERENCES public.soil_areas(id);
