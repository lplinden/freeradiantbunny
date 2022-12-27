CREATE SEQUENCE public.plant_histories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_histories_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_histories (
    id integer DEFAULT nextval('public.plant_histories_id_seq'::regclass) NOT NULL,
    plant_list_plant_id integer,
    seed_packet_id integer
);

ALTER TABLE public.plant_histories OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_histories
    ADD CONSTRAINT plant_histories_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plant_histories
    ADD CONSTRAINT plant_histories_plant_seed_packet_id_fk FOREIGN KEY (plant_seed_packet_id) REFERENCES public.plant_seed_packets(id);

ALTER TABLE ONLY public.plant_histories
    ADD CONSTRAINT plant_histories_plant_history_id_fk FOREIGN KEY (plant_history_id) REFERENCES public.plant_histories(id);
