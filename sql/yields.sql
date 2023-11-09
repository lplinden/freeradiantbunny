CREATE SEQUENCE public.yields_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.yields_id_seq OWNER TO freerad2_special;

CREATE TABLE public.yields (
    id integer DEFAULT nextval('public.yields_id_seq'::regclass) NOT NULL,
    plants_id integer,
    numerator_units_id integer,
    denominator_units_id integer,
    estimated_yield text,
    source text,
    range text
);

ALTER TABLE public.yields OWNER TO freerad2_special;

ALTER TABLE ONLY public.yields
    ADD CONSTRAINT yields_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.yields
    ADD CONSTRAINT yields_plants_id_fk FOREIGN KEY (plants_id) REFERENCES public.plants(id);

ALTER TABLE ONLY public.yields
    ADD CONSTRAINT yields_numerator_units_id_fk FOREIGN KEY (numerator_units_id) REFERENCES public.units(id);

ALTER TABLE ONLY public.yields
    ADD CONSTRAINT yields_denominator_units_id_fk FOREIGN KEY (denominator_units_id) REFERENCES public.units(id);
