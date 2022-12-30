CREATE SEQUENCE public.stacks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.stacks_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stacks (
    id integer DEFAULT nextval('public.stacks_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    application_id integer,
    priority text
);

ALTER TABLE public.stacks OWNER TO freerad2_special;

ALTER TABLE ONLY public.stacks
    ADD CONSTRAINT stacks_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.stacks
    ADD CONSTRAINT stacks_application_id_fk FOREIGN KEY (application_id) REFERENCES public.applications(id);
