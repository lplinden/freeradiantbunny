CREATE SEQUENCE public.domain_measurements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.domain_measurements_id_seq OWNER TO freerad2_special;

CREATE TABLE public.domain_measurements (
    id integer DEFAULT nextval('public.domain_measurements_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    publish text
);

ALTER TABLE public.domain_measurements OWNER TO freerad2_special;

ALTER TABLE ONLY public.domain_measurements
    ADD CONSTRAINT domain_measurements_pk PRIMARY KEY (id);
