CREATE SEQUENCE public.datastore_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.datastore_id_seq OWNER TO freerad2_special;

CREATE TABLE public.datastores (
    id integer DEFAULT nextval('public.datastore_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    machine_id integer
);

ALTER TABLE ONLY public.datastores
    ADD CONSTRAINT datastore_id_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.datastores
    ADD CONSTRAINT datastores_machine_id_fkey FOREIGN KEY (machine_id) REFERENCES public.machines(id);
