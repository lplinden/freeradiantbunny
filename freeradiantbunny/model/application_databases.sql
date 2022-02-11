CREATE TABLE public.application_databases (
    id integer NOT NULL,
    application_id integer,
    database_id integer
);


ALTER TABLE public.application_databases OWNER TO freerad2_special;

ALTER TABLE ONLY public.application_databases
    ADD CONSTRAINT application_database_id_pkey PRIMARY KEY (id);
