CREATE SEQUENCE public.yields_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.yields_id_seq OWNER TO freerad2_special;

CREATE TABLE public.yields (
    id integer DEFAULT nextval('public.yields_id_seq'::regclass) NOT NULL,
    plant_id integer,
    estimated_yield text,
    numerator_unit_id integer,
    source text,
    denominator_unit_id integer,
    range text
);

ALTER TABLE public.yields OWNER TO freerad2_special;

ALTER TABLE ONLY public.yields
    ADD CONSTRAINT yields_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.yields
    ADD CONSTRAINT yields_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);
