CREATE SEQUENCE public.plant_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_images_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_images (
    id integer DEFAULT nextval('public.plant_images_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    plant_id integer
);

ALTER TABLE public.plant_images OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_images
    ADD CONSTRAINT plant_images_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plant_images
    ADD CONSTRAINT plant_images_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);
