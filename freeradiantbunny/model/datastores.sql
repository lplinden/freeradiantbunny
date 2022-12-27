CREATE SEQUENCE public.datastores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.datastores_id_seq OWNER TO freerad2_special;

CREATE TABLE public.datastores (
    id integer DEFAULT nextval('public.datastores_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    status text,
    sort text,
    img_url text,
    machine_id integer
);

ALTER TABLE public.datastores OWNER TO freerad2_special;

ALTER TABLE ONLY public.datastores
    ADD CONSTRAINT datastores_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.datastores
    ADD CONSTRAINT datastores_machine_id_fk FOREIGN KEY (machine_id) REFERENCES public.machines(id);
