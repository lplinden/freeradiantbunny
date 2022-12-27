CREATE SEQUENCE public.designers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.designers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.designers (
    id integer DEFAULT nextval('public.designers_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text
);

ALTER TABLE public.designers OWNER TO freerad2_special;

ALTER TABLE ONLY public.designers
    ADD CONSTRAINT designers_pk PRIMARY KEY (id);
