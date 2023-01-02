CREATE SEQUENCE public.varieties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.varieties_id_seq OWNER TO freerad2_special;

CREATE TABLE public.varieties (
    id integer DEFAULT nextval('public.varieties_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    plants_id integer
);

ALTER TABLE public.varieties OWNER TO freerad2_special;

ALTER TABLE ONLY public.varieties
    ADD CONSTRAINT varieties_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.varieties
    ADD CONSTRAINT varieties_plants_id_fk FOREIGN KEY (plants_id) REFERENCES public.plants(id);
