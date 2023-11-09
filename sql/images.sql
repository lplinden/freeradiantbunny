-- version 0.0.5
CREATE SEQUENCE public.images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.images_id_seq OWNER TO freerad2_special;

CREATE TABLE public.images (
    id integer DEFAULT nextval('public.images_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    img_url text NOT NULL,
    status text NOT NULL,
    sort text NOT NULL,
    domains_tli character varying(3) NOT NULL,
    path text NOT NULL
);

ALTER TABLE public.images OWNER TO freerad2_special;

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_domains_tli_fk FOREIGN KEY (domains_tli) REFERENCES public.domains(tli);

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_domains_tli_path_unique UNIQUE (domains_tli, path);

--SELECT pg_catalog.setval('public.images_id_seq', 200, true);
