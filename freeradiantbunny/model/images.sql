CREATE SEQUENCE public.image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.image_id_seq OWNER TO freerad2_special;

CREATE TABLE public.images (
    id integer DEFAULT nextval('public.image_id_seq'::regclass) NOT NULL,
    img_url text UNIQUE,
    caption text,
    description text,
    photographer text,
    license text,
    domain_tli text,
    name text,
    sort text,
    status text
);

ALTER TABLE public.images OWNER TO freerad2_special;
