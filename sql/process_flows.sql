CREATE SEQUENCE public.process_flows_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.process_flows_id_seq OWNER TO freerad2_special;

CREATE TABLE public.process_flows (
    id integer DEFAULT nextval('public.process_flows_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    parent_processes_id integer,
    child_processes_id integer
);

ALTER TABLE public.process_flows OWNER TO freerad2_special;

ALTER TABLE ONLY public.process_flows
    ADD CONSTRAINT process_flows_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.process_flows
    ADD CONSTRAINT process_flows_parent_processes_id_fk FOREIGN KEY (parent_processes_id) REFERENCES public.processes(id);

ALTER TABLE ONLY public.process_flows
    ADD CONSTRAINT process_flows_child_processes_id_fk FOREIGN KEY (child_processes_id) REFERENCES public.processes(id);
