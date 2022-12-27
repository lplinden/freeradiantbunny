CREATE SEQUENCE public.documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.documents_id_seq OWNER TO freerad2_special;

CREATE TABLE public.documents (
    id integer DEFAULT nextval('public.documents_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    domain_tli text,
    url text
);

ALTER TABLE public.documents OWNER TO freerad2_special;

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_domain_tli_fk FOREIGN KEY (domain_tli) REFERENCES public.domains(tli);
