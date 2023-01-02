CREATE SEQUENCE public.plant_units_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_units_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_units (
    id integer DEFAULT nextval('public.plant_units_id_seq'::regclass) NOT NULL,
    plants_id integer,
    units_id integer
);

ALTER TABLE public.plant_units OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_units
    ADD CONSTRAINT plant_units_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plant_units
    ADD CONSTRAINT plant_units_plants_id_fk FOREIGN KEY (plants_id) REFERENCES public.plants(id);

ALTER TABLE ONLY public.plant_units
    ADD CONSTRAINT plant_units_units_id_fk FOREIGN KEY (units_id) REFERENCES public.units(id);
