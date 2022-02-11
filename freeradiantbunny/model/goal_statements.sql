CREATE SEQUENCE public.goal_statement_id_seq
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.goal_statement_id_seq OWNER TO freerad2_special;

CREATE TABLE public.goal_statements (
    id integer DEFAULT nextval('public.goal_statement_id_seq'::regclass) NOT NULL,
    description text,
    project_id integer NOT NULL,
    sort text,
    status text,
    name text,
    img_url text,
    publish text
);

ALTER TABLE public.goal_statements OWNER TO freerad2_special;

ALTER TABLE ONLY public.goal_statements
    ADD CONSTRAINT goal_statement_id_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.goal_statements
    ADD CONSTRAINT goal_statements_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);
