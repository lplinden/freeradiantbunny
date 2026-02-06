-- version 0.0.6
CREATE SEQUENCE public.applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.applications_id_seq OWNER TO freerad2_special;

CREATE TABLE public.applications (
    id integer DEFAULT nextval('public.application_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    sort text  NOT NULL,
    img_url text NOT NULL,
    description text NOT NULL,
    status text NOT NULL,
    url text,
    url_external text,
    runtarget text,
    runtarget_switches text,
    inhouse boolean,
    mudiabot boolean,
    approved boolean,
    appmap_url text,
    repository text
);

ALTER TABLE public.applications OWNER TO freerad2_special;

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_name_unique UNIQUE (name);

SELECT pg_catalog.setval('public.applications_id_seq', 90, true);
