CREATE SEQUENCE public.domains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.domains_id_seq OWNER TO freerad2_special;

CREATE TABLE public.domains (
    id integer DEFAULT nextval('public.domains_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    tli text NOT NULL,
    domain_name text NOT NULL,
    tagline text,
    registrar text,
    hosting text,
    crm text,
    username text,
    backups text,
    log text,
    ssl_cert character varying(1),
    inquiring_system text
);

ALTER TABLE public.domains OWNER TO freerad2_special;

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_tli_unique UNIQUE (tli);
