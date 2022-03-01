CREATE SEQUENCE public.yield_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9
    CACHE 1;

ALTER TABLE public.yield_id_seq OWNER TO freerad2_special;

CREATE TABLE public.yields (
    id integer DEFAULT nextval('public.yield_id_seq'::regclass) NOT NULL,
    plant_id integer,
    estimated_yield text,
    numerator_unit_id integer,
    source text,
    denominator_unit_id integer,
    range text
);

ALTER TABLE public.yields OWNER TO freerad2_special;
