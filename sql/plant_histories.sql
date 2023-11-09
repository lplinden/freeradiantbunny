CREATE SEQUENCE public.plant_histories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_histories_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_histories (
    id integer DEFAULT nextval('public.plant_histories_id_seq'::regclass) NOT NULL,
    plant_list_plants_id integer,
    seed_packets_id integer
);

ALTER TABLE public.plant_histories OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_histories
    ADD CONSTRAINT plant_histories_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plant_histories
    ADD CONSTRAINT plant_histories_plant_list_plants_id_fk FOREIGN KEY (plant_list_plants_id) REFERENCES public.plant_list_plants(id);

ALTER TABLE ONLY public.plant_histories
    ADD CONSTRAINT plant_histories_seed_packets_id_fk FOREIGN KEY (seed_packets_id) REFERENCES public.seed_packets(id);
