CREATE SEQUENCE public.land_trait_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.land_trait_id_seq OWNER TO freerad2_special;

CREATE TABLE public.land_traits (
    id integer DEFAULT nextval('public.land_trait_id_seq'::regclass) NOT NULL,
    name text,
    value text,
    sort text,
    status text,
    land_id integer,
    reference text,
    img_url text,
    description text
);

ALTER TABLE public.land_traits OWNER TO freerad2_special;
