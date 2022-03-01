CREATE SEQUENCE public.land_city_state_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.land_city_state_id_seq OWNER TO freerad2_special;

CREATE TABLE public.land_city_states (
    id integer DEFAULT nextval('public.land_city_state_id_seq'::regclass) NOT NULL,
    land_id integer,
    city text,
    state text
);

ALTER TABLE public.land_city_states OWNER TO freerad2_special;
