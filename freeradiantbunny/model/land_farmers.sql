CREATE SEQUENCE public.land_farmers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.land_farmers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.land_farmers (
    id integer DEFAULT nextval('public.land_farmers_id_seq'::regclass) NOT NULL,
    soil_area_id integer,
    farmer text
);

ALTER TABLE public.land_farmers OWNER TO freerad2_special;

ALTER TABLE ONLY public.land_farmers
    ADD CONSTRAINT land_farmers_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.land_farmers
    ADD CONSTRAINT land_farmers_soil_area_id_fk FOREIGN KEY (soil_area_id) REFERENCES public.soil_areas(id);
