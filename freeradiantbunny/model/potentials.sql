CREATE SEQUENCE public.potential_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.potential_id_seq OWNER TO freerad2_special;

CREATE TABLE public.potentials (
    id integer DEFAULT nextval('public.potential_id_seq'::regclass) NOT NULL,
    name text,
    address text,
    homepage text,
    notes text,
    sort text,
    status text,
    webmaster_info text
);

ALTER TABLE public.potentials OWNER TO freerad2_special;
