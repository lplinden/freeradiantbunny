CREATE SEQUENCE public.documentations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.documentations_id_seq OWNER TO freerad2_special;

CREATE TABLE public.documentations (
    id integer DEFAULT nextval('public.documentations_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    username text,
    categorization text,
    table_name text,
    how_to_measure text
);

ALTER TABLE public.documentations OWNER TO freerad2_special;

ALTER TABLE ONLY public.documentations
    ADD CONSTRAINT documentations_pk PRIMARY KEY (id);
