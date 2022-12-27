CREATE SEQUENCE public.storages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.storages_id_seq OWNER TO freerad2_special;

CREATE TABLE public.storages (
    id integer DEFAULT nextval('public.storages_id_seq'::regclass) NOT NULL,
    plant_id integer,
    instructions text,
    source text
);

ALTER TABLE public.storages OWNER TO freerad2_special;

ALTER TABLE ONLY public.storages
    ADD CONSTRAINT storages_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.storages
    ADD CONSTRAINT storages_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);
