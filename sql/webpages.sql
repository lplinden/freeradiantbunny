CREATE SEQUENCE public.webpages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.webpages_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webpages (
    id integer DEFAULT nextval('public.webpages_id_seq'::regclass) NOT NULL,
    description text NOT NULL,
    name text NOT NULL,
    sort text NOT NULL,
    img_url text NOT NULL,
    status text NOT NULL,
    path text NOT NULL,
    domains_tli character varying(3) NOT NULL
);

ALTER TABLE public.webpages OWNER TO freerad2_special;

ALTER TABLE ONLY public.webpages
    ADD CONSTRAINT webpages_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.webpages
    ADD CONSTRAINT webpages_domains_tli_fk FOREIGN KEY (domains_tli) REFERENCES public.domains(tli);

ALTER TABLE ONLY public.webpages
    ADD CONSTRAINT webpages_domains_tli_path_unique UNIQUE (domains_tli, path);

--SELECT pg_catalog.setval('public.webpages_id_seq', 11245, true);
