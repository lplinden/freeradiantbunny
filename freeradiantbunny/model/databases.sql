CREATE SEQUENCE public.databases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.databases_id_seq OWNER TO freerad2_special;

CREATE TABLE public.databases (
    id integer DEFAULT nextval('public.databases_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    management_system character varying(20),
    date_last_backup text,
    schema_version text
);

ALTER TABLE public.databases OWNER TO freerad2_special;

ALTER TABLE ONLY public.databases
    ADD CONSTRAINT databases_pk PRIMARY KEY (id);
