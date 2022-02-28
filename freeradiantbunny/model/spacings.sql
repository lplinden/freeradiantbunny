CREATE SEQUENCE public.spacing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.spacing_id_seq OWNER TO freerad2_special;

CREATE TABLE public.spacings (
    id integer DEFAULT nextval('public.spacing_id_seq'::regclass) NOT NULL,
    plant_id integer,
    rows_per_bed text,
    inches_between_plants text,
    source text
);

ALTER TABLE public.spacings OWNER TO freerad2_special;
