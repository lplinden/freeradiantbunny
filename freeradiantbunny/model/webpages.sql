CREATE SEQUENCE public.webpages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.webpages_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webpages (
    id integer DEFAULT nextval('public.webpages_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    domain_tli character varying(3) NOT NULL,
    path text,
    quality text
);

ALTER TABLE public.webpages OWNER TO freerad2_special;

ALTER TABLE ONLY public.webpages
    ADD CONSTRAINT webpages_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.webpages
    ADD CONSTRAINT webpages_domain_tli_fk FOREIGN KEY (domain_tli) REFERENCES public.domains(tli);

ALTER TABLE ONLY public.webpages
    ADD CONSTRAINT webpages_domain_tli_path_unique UNIQUE (domain_tli, path);
