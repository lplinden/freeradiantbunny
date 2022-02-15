CREATE SEQUENCE public.plant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.plant_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plants (
    id integer DEFAULT nextval('public.plant_id_seq'::regclass) NOT NULL,
    name text DEFAULT 'default'::text NOT NULL,
    botanical_name text,
    plant_family_id integer DEFAULT 13 NOT NULL,
    description text,
    sort text,
    status text,
    img_url text
);

ALTER TABLE public.plants OWNER TO freerad2_special;
