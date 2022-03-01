CREATE SEQUENCE public.price_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.price_id_seq OWNER TO freerad2_special;

CREATE TABLE public.prices (
    id integer DEFAULT nextval('public.price_id_seq'::regclass) NOT NULL,
    plant_id integer,
    supplier_id integer,
    date character varying(10),
    dollars character varying(10),
    unit_count text,
    quality text,
    organic_flag character varying(10),
    unit_id integer
);

ALTER TABLE public.prices OWNER TO freerad2_special;
