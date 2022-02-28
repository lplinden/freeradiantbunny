CREATE SEQUENCE public.pickup_plant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.pickup_plant_id_seq OWNER TO freerad2_special;

CREATE TABLE public.pickup_plants (
    id integer DEFAULT nextval('public.pickup_plant_id_seq'::regclass) NOT NULL,
    pickup_id integer,
    plant_id integer,
    unit_id integer,
    quantity real
);

ALTER TABLE public.pickup_plants OWNER TO freerad2_special;
