CREATE SEQUENCE public.providers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.providers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.providers (
    id integer DEFAULT nextval('public.providers_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    address text,
    url text
);

ALTER TABLE public.providers OWNER TO freerad2_special;

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pk PRIMARY KEY (id);
