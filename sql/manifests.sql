-- version 0.0.6
CREATE SEQUENCE public.manifests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.manifests_id_seq OWNER TO freerad2_special;

CREATE TABLE public.manifests (
    id integer DEFAULT nextval('public.application_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    sort text NOT NULL,
    img_url text,
    description text,
    status text,
    datastores_id integer,
    path text
);

ALTER TABLE public.manifests OWNER TO freerad2_special;

ALTER TABLE ONLY public.manifests
    ADD CONSTRAINT manifests_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.manifests
    ADD CONSTRAINT manifests_name_unique UNIQUE (name);
