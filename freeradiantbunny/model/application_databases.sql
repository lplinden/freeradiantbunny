CREATE SEQUENCE public.application_databases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.application_databases_id_seq OWNER TO freerad2_special;

CREATE TABLE public.application_databases (
    id integer DEFAULT nextval('public.application_databases_id_seq'::regclass) NOT NULL,
    application_id integer,
    database_id integer
);

ALTER TABLE public.application_databases OWNER TO freerad2_special;

ALTER TABLE ONLY public.application_databases
    ADD CONSTRAINT application_databases_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.application_databases
    ADD CONSTRAINT application_databases_application_id_fk FOREIGN KEY (application_id) REFERENCES public.applications(id);

ALTER TABLE ONLY public.application_databases
    ADD CONSTRAINT application_databases_database_id_fk FOREIGN KEY (database_id) REFERENCES public.databases(id);
