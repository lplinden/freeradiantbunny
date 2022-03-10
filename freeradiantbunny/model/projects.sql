CREATE SEQUENCE public.project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.project_id_seq OWNER TO freerad2_special;

CREATE TABLE public.projects (
    id integer DEFAULT nextval('public.project_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    publish text
);


ALTER TABLE public.projects OWNER TO freerad2_special;

    
