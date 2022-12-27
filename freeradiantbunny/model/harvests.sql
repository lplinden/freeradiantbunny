CREATE SEQUENCE public.harvests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.harvests_id_seq OWNER TO freerad2_special;

CREATE TABLE public.harvests (
    id integer DEFAULT nextval('public.harvests_id_seq'::regclass) NOT NULL,
    project_id integer,
    name text,
    sort text,
    shares_estimate text
);

ALTER TABLE public.harvests OWNER TO freerad2_special;

ALTER TABLE ONLY public.harvests
    ADD CONSTRAINT harvests_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.harvests
    ADD CONSTRAINT harvests_project_id_fk FOREIGN KEY (project_id) REFERENCES public.projects(id);
