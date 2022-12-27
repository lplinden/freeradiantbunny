CREATE SEQUENCE public.soil_areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.soil_areas_id_seq OWNER TO freerad2_special;

CREATE TABLE public.soil_areas (
    id integer DEFAULT nextval('public.soil_areas_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    bed_id integer,
    dimensions text
);

ALTER TABLE public.soil_areas OWNER TO freerad2_special;

ALTER TABLE ONLY public.soil_areas
    ADD CONSTRAINT soil_areas_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.soil_areas
    ADD CONSTRAINT soil_areas_bed_id_fk FOREIGN KEY (bed_id) REFERENCES public.beds(id);
