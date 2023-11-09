-- version 0.0.5
CREATE TABLE public.domains (
    tli character varying(3) NOT NULL,
    domain_name text NOT NULL,
    tagline text NOT NULL,
    img_url text NOT NULL,
    registrar text NOT NULL,
    hosting text NOT NULL,
    status text NOT NULL,
    crm text NOT NULL,
    name text NOT NULL,
    backups text NOT NULL,
    log text NOT NULL,
    description text NOT NULL,
    id integer NOT NULL,
    sort text NOT NULL,
    ssl_cert character varying(1) NOT NULL
);

ALTER TABLE public.domains OWNER TO freerad2_special;

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_name_unique UNIQUE (name);

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_tli_unique UNIQUE (tli);
