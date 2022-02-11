CREATE SEQUENCE public.build_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.build_id_seq OWNER TO freerad2_special;

CREATE TABLE public.builds (
    id integer DEFAULT nextval('public.build_id_seq'::regclass) NOT NULL,
    project_id integer,
    status text,
    description text,
    sort text,
    name text,
    img_url text,
    client_supplier_id integer,
    versions text,
    ranking text
);

ALTER TABLE public.builds OWNER TO freerad2_special;

ALTER TABLE ONLY public.builds
    ADD CONSTRAINT build_id_pkey PRIMARY KEY (id);
    
