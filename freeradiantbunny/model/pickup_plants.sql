CREATE SEQUENCE public.pickup_plants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.pickup_plants_id_seq OWNER TO freerad2_special;

CREATE TABLE public.pickup_plants (
    id integer DEFAULT nextval('public.pickup_plants_id_seq'::regclass) NOT NULL,
    pickup_id integer,
    plant_id integer,
    unit_id integer,
    quantity real
);

ALTER TABLE public.pickup_plants OWNER TO freerad2_special;

ALTER TABLE ONLY public.pickup_plants
    ADD CONSTRAINT pickup_plants_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.pickup_plants
    ADD CONSTRAINT pickup_plants_pickup_id_fk FOREIGN KEY (pickup_id) REFERENCES public.pickups(id);

ALTER TABLE ONLY public.pickup_plants
    ADD CONSTRAINT pickup_plants_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);

ALTER TABLE ONLY public.pickup_plants
    ADD CONSTRAINT pickup_plants_unit_id_fk FOREIGN KEY (unit_id) REFERENCES public.units(id);
