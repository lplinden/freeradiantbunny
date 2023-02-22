CREATE SEQUENCE public.subsystems_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.subsystems_id_seq OWNER TO freerad2_special;

CREATE TABLE public.subsystems (
    id integer DEFAULT nextval('public.subsystems_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    rules text
);

ALTER TABLE public.subsystems OWNER TO freerad2_special;

ALTER TABLE ONLY public.subsystems
    ADD CONSTRAINT subsystems_pk PRIMARY KEY (id);
