CREATE SEQUENCE public.applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.applications_id_seq OWNER TO freerad2_special;

CREATE TABLE public.applications (
    id integer DEFAULT nextval('public.applications_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    url text,
    source_code_url text
);

ALTER TABLE public.applications OWNER TO freerad2_special;

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pk PRIMARY KEY (id);
