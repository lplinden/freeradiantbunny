CREATE SEQUENCE public.ux_design_docs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_design_docs_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_design_docs (
    id integer DEFAULT nextval('public.ux_design_docs_id_seq'::regclass) NOT NULL,
    description text NOT NULL,
    name text NOT NULL,
    sort text NOT NULL,
    img_url text NOT NULL,
    status text NOT NULL,
    priority text NOT NULL,
    code_name text NOT NULL,
    url text NOT NULL,
    description text NOT NULL
);

ALTER TABLE public.ux_design_docs OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_design_docs
    ADD CONSTRAINT ux_design_docs_pk PRIMARY KEY (id);
