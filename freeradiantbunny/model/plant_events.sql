CREATE SEQUENCE public.plant_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.plant_event_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_events (
    id integer DEFAULT nextval('public.plant_event_id_seq'::regclass) NOT NULL,
    name text,
    plant_history_id integer,
    soil_area_id integer,
    "time" text,
    task text,
    status text
);

ALTER TABLE public.plant_events OWNER TO freerad2_special;
