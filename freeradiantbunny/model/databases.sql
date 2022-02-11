CREATE SEQUENCE public.database_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.database_id_seq OWNER TO freerad2_special;

CREATE TABLE public.databases (
    id integer DEFAULT nextval('public.database_id_seq'::regclass) NOT NULL,
    management_system character varying(20),
    name text,
    date_last_backup text,
    schema_version text,
    description text,
    sort text,
    status text,
    img_url text
);

ALTER TABLE public.databases OWNER TO freerad2_special;

ALTER TABLE ONLY public.databases
    ADD CONSTRAINT databases_id_pkey PRIMARY KEY (id);
