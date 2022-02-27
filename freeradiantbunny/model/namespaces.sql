CREATE SEQUENCE public.namespace_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.namespace_id_seq OWNER TO freerad2_special;

CREATE TABLE public.namespaces (
    id integer DEFAULT nextval('public.namespace_id_seq'::regclass) NOT NULL,
    name text,
    volume text,
    top_class_name text,
    top_id text,
    ig_name text,
    description text,
    sort text,
    status text,
    img_url text,
    order_by text,
    alias text
);

ALTER TABLE public.namespaces OWNER TO freerad2_special;
