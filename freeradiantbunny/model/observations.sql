CREATE SEQUENCE public.observation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.observation_id_seq OWNER TO freerad2_special;

CREATE TABLE public.observations (
    id integer DEFAULT nextval('public.observation_id_seq'::regclass) NOT NULL,
    land_id integer,
    unit_id integer DEFAULT 21,
    ts text,
    notes text,
    design_instance_id integer,
    raw text,
    raw_read boolean DEFAULT false,
    measurement text
);

ALTER TABLE public.observations OWNER TO freerad2_special;
