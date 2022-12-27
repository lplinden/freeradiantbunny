CREATE SEQUENCE public.plant_list_plants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_list_plants_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_list_plants (
    id integer DEFAULT nextval('public.plant_list_plants_id_seq'::regclass) NOT NULL,
    plant_id integer,
    plant_list_id integer
);

ALTER TABLE public.plant_list_plants OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_list_plants
    ADD CONSTRAINT plant_list_plants_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plant_list_plants
    ADD CONSTRAINT plant_list_plants_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);

ALTER TABLE ONLY public.plant_list_plants
    ADD CONSTRAINT plant_list_plants_plant_list_id_fk FOREIGN KEY (plant_list_id) REFERENCES public.plant_lists(id);
