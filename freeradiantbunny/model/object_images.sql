CREATE SEQUENCE public.object_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.object_image_id_seq OWNER TO freerad2_special;

CREATE TABLE public.object_images (
    id integer DEFAULT nextval('public.object_image_id_seq'::regclass) NOT NULL,
    image_id integer,
    class_primary_key_string text,
    class_name_string text
);

ALTER TABLE public.object_images OWNER TO freerad2_special;
