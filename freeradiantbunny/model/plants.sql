CREATE SEQUENCE public.plants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plants_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plants (
    id integer DEFAULT nextval('public.plants_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    plant_families_id integer,
    botanical_name text
);

ALTER TABLE public.plants OWNER TO freerad2_special;

ALTER TABLE ONLY public.plants
    ADD CONSTRAINT plants_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plants
    ADD CONSTRAINT plants_plant_families_id_fk FOREIGN KEY (plant_families_id) REFERENCES public.plant_families(id);
