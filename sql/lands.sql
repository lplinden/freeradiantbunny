CREATE SEQUENCE public.lands_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.lands_id_seq OWNER TO freerad2_special;

CREATE TABLE public.lands (
    id integer DEFAULT nextval('public.lands_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    parent_land_id integer
);

ALTER TABLE public.lands OWNER TO freerad2_special;

ALTER TABLE ONLY public.lands
    ADD CONSTRAINT lands_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.lands
    ADD CONSTRAINT lands_parent_land_id_fk FOREIGN KEY (parent_land_id) REFERENCES public.lands(id);
