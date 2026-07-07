-- version 0.0.5
CREATE SEQUENCE public.subdomains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.subdomains_id_seq OWNER TO freerad2_special;

CREATE TABLE public.subdomains (
    id integer DEFAULT nextval('public.subdomains_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    img_url text,
    status text,
    sort text,
    domains_tli character varying(3),
    webpages_id integer
);

ALTER TABLE public.subdomains OWNER TO freerad2_special;

ALTER TABLE ONLY public.subdomains
    ADD CONSTRAINT subdomains_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.subdomains
    ADD CONSTRAINT subdomains_name_unique UNIQUE (name);

