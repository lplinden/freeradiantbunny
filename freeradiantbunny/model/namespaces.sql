CREATE SEQUENCE public.namespaces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.namespaces_id_seq OWNER TO freerad2_special;

CREATE TABLE public.namespaces (
    id integer DEFAULT nextval('public.namespaces_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    top_id integer,
    volume text,
    top_class_name text,
    ig_name text,
    orderby text,
    alias text
);

ALTER TABLE public.namespaces OWNER TO freerad2_special;

ALTER TABLE ONLY public.namespaces
    ADD CONSTRAINT namespaces_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.namespaces
    ADD CONSTRAINT namespaces_top_id_fk FOREIGN KEY (top_id) REFERENCES public.tops(id);
