CREATE SEQUENCE public.plant_attributes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_attributes_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_attributes (
    id integer DEFAULT nextval('public.plant_attributes_id_seq'::regclass) NOT NULL,
    plants_id integer,
    attribute_name text,
    attribute_value text
);

ALTER TABLE public.plant_attributes OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_attributes
    ADD CONSTRAINT plant_attributes_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plant_attributes
    ADD CONSTRAINT plant_attributes_plants_id_fk FOREIGN KEY (plants_id) REFERENCES public.plants(id);
