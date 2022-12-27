CREATE SEQUENCE public.designs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.designs_id_seq OWNER TO freerad2_special;

CREATE TABLE public.designs (
    id integer DEFAULT nextval('public.designs_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    domain_tli character varying(3) NOT NULL,
    publish text
);

ALTER TABLE public.designs OWNER TO freerad2_special;

ALTER TABLE ONLY public.designs
    ADD CONSTRAINT designs_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.designs
    ADD CONSTRAINT designs_domain_tli_fk FOREIGN KEY (domain_tli) REFERENCES public.domains(tli);
