CREATE SEQUENCE public.goal_statements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.goal_statements_id_seq OWNER TO freerad2_special;

CREATE TABLE public.goal_statements (
    id integer DEFAULT nextval('public.goal_statements_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    projects_id integer
);

ALTER TABLE public.goal_statements OWNER TO freerad2_special;

ALTER TABLE ONLY public.goal_statements
    ADD CONSTRAINT goal_statements_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.goal_statements
    ADD CONSTRAINT goal_statements_projects_id_fk FOREIGN KEY (projects_id) REFERENCES public.projects(id);
