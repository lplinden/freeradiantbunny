CREATE SEQUENCE public.plant_lists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_lists_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_lists (
    id integer DEFAULT nextval('public.plant_lists_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text
);

ALTER TABLE public.plant_lists OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_lists
    ADD CONSTRAINT plant_lists_pk PRIMARY KEY (id);
