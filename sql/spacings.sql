CREATE SEQUENCE public.spacings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.spacings_id_seq OWNER TO freerad2_special;

CREATE TABLE public.spacings (
    id integer DEFAULT nextval('public.spacings_id_seq'::regclass) NOT NULL,
    plant_id integer,
    rows_per_bed text,
    inches_between_plants text,
    source text
);

ALTER TABLE public.spacings OWNER TO freerad2_special;

ALTER TABLE ONLY public.spacings
    ADD CONSTRAINT spacings_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.spacings
    ADD CONSTRAINT spacings_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);
