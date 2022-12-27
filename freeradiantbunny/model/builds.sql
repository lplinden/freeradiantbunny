CREATE SEQUENCE public.builds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.builds_id_seq OWNER TO freerad2_special;

CREATE TABLE public.builds (
    id integer DEFAULT nextval('public.builds_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    supplier_id integer,
    project_id integer,
    versions text,
    ranking text
);

ALTER TABLE public.builds OWNER TO freerad2_special;

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_supplier_id_fk FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT builds_project_id_fk FOREIGN KEY (project_id) REFERENCES public.projects(id);
