CREATE SEQUENCE public.provider_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.provider_id_seq OWNER TO freerad2_special;

CREATE TABLE public.providers (
    id integer DEFAULT nextval('public.provider_id_seq'::regclass) NOT NULL,
    name text,
    address text,
    url text	
);

ALTER TABLE public.providers OWNER TO freerad2_special;
