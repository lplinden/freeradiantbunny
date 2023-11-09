CREATE SEQUENCE public.plant_families_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_families_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_families (
    id integer DEFAULT nextval('public.plant_families_id_seq'::regclass) NOT NULL,
    name text NOT NULL
);

ALTER TABLE public.plant_families OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_families
    ADD CONSTRAINT plant_families_pk PRIMARY KEY (id);
