CREATE SEQUENCE public.processes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.processes_id_seq OWNER TO freerad2_special;

CREATE TABLE public.processes (
    id integer DEFAULT nextval('public.processes_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    business_plan_texts_id integer,
    priority text,
    time_rules text,
    yield text
);

ALTER TABLE public.processes OWNER TO freerad2_special;

ALTER TABLE ONLY public.processes
    ADD CONSTRAINT processes_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.processes
    ADD CONSTRAINT processes_business_plan_texts_id_fk FOREIGN KEY (business_plan_texts_id) REFERENCES public.business_plan_texts(id);

CREATE INDEX processes_index_id ON public.processes USING btree (id);
