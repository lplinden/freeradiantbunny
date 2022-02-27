CREATE SEQUENCE public.plant_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.plant_image_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_images (
    id integer DEFAULT nextval('public.plant_image_id_seq'::regclass) NOT NULL,
    name text,
    img_url text,
    plant_id integer
);

ALTER TABLE public.plant_images OWNER TO freerad2_special;
