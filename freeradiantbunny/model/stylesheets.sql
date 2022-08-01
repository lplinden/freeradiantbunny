CREATE SEQUENCE public.stylesheet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.stylesheet_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stylesheets (
    id integer DEFAULT nextval('public.stylesheet_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    domain_tli text,
    url text UNIQUE
);

ALTER TABLE public.stylesheets OWNER TO freerad2_special;

ALTER TABLE ONLY public.stylesheets
    ADD CONSTRAINT stylesheets_domain_id_fkey FOREIGN KEY (domain_tli) REFERENCES public.domains(tli);
