CREATE SEQUENCE public.visit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.visit_id_seq OWNER TO freerad2_special;

CREATE TABLE public.visits (
    id integer DEFAULT nextval('public.visit_id_seq'::regclass) NOT NULL,
    rough_date text,
    fact boolean,
    land_id integer,
    name text,
    plant_history_event_id integer,
    "order" text,
    count integer,
    layout integer
);

ALTER TABLE public.visits OWNER TO freerad2_special;
