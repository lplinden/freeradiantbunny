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
    description text,
    img_url text,
    status text,
    sort text,
    domains_tli character varying(3) NOT NULL,
    caption text,
    photographer text,
    license text,
    quality text,
    url text
);

ALTER TABLE public.images OWNER TO freerad2_special;

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_domains_tli_fk FOREIGN KEY (domains_tli) REFERENCES public.domains(tli);

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_url_unique UNIQUE (url);
