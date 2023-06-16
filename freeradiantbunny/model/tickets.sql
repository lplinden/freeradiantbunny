CREATE SEQUENCE public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.tickets_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tickets (
    id integer DEFAULT nextval('public.tickets_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    processes_id integer,
    action_to_take text
);

ALTER TABLE public.tickets OWNER TO freerad2_special;

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_processes_id_fk FOREIGN KEY (processes_id) REFERENCES public.processes(id);
