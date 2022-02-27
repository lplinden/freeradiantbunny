CREATE SEQUENCE public.land_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.land_id_sequence OWNER TO freerad2_special;

CREATE TABLE public.lands (
    id integer DEFAULT nextval('public.land_id_sequence'::regclass) NOT NULL,
    name text,
    sort text,
    description text,
    status text,
    img_url text,
    parent_land_id integer
);

ALTER TABLE public.lands OWNER TO freerad2_special;
