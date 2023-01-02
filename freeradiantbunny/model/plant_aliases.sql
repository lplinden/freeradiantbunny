CREATE SEQUENCE public.plant_aliases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_aliases_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_aliases (
    id integer DEFAULT nextval('public.plant_aliases_id_seq'::regclass) NOT NULL,
    plants_id integer,
    name text
);

ALTER TABLE public.plant_aliases OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_aliases
    ADD CONSTRAINT plant_aliases_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plant_aliases
    ADD CONSTRAINT plant_aliases_plants_id_fk FOREIGN KEY (plants_id) REFERENCES public.plants(id);
