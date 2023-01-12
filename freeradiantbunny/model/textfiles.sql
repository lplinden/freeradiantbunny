CREATE SEQUENCE public.textfiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.textfiles_id_seq OWNER TO freerad2_special;

CREATE TABLE public.textfiles (
    id integer DEFAULT nextval('public.textfiles_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    domains_tli character varying(3) NOT NULL,
    path text
);

ALTER TABLE public.textfiles OWNER TO freerad2_special;

ALTER TABLE ONLY public.textfiles
    ADD CONSTRAINT textfiles_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.textfiles
    ADD CONSTRAINT textfiles_domains_tli_fk FOREIGN KEY (domains_tli) REFERENCES public.domains(tli);
