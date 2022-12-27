CREATE SEQUENCE public.plant_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.plant_events_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_events (
    id integer DEFAULT nextval('public.plant_events_id_seq'::regclass) NOT NULL,
    name text,
    plant_history_id integer,
    soil_area_id integer,
    timestamp text,
    task text,
    status text
);

ALTER TABLE public.plant_events OWNER TO freerad2_special;

ALTER TABLE ONLY public.plant_events
    ADD CONSTRAINT plant_events_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.plant_events
    ADD CONSTRAINT plant_events_plant_history_id_fk FOREIGN KEY (plant_history_id) REFERENCES public.plant_histories(id);
