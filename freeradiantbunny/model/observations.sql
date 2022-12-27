CREATE SEQUENCE public.observations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.observations_id_seq OWNER TO freerad2_special;

CREATE TABLE public.observations (
    id integer DEFAULT nextval('public.observations_id_seq'::regclass) NOT NULL,
    land_id integer,
    unit_id integer,
    ts text,
    notes text,
    design_instance_id integer,
    raw text,
    raw_read boolean DEFAULT false,
    measurement text
);

ALTER TABLE public.observations OWNER TO freerad2_special;

ALTER TABLE ONLY public.observations
    ADD CONSTRAINT observations_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.observations
    ADD CONSTRAINT observations_land_id_fk FOREIGN KEY (land_id) REFERENCES public.lands(id);

ALTER TABLE ONLY public.observations
    ADD CONSTRAINT observations_unit_id_fk FOREIGN KEY (unit_id) REFERENCES public.units(id);
