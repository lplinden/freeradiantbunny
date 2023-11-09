CREATE SEQUENCE public.moneymaker_measurement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.moneymaker_measurement_id_seq OWNER TO freerad2_special;

CREATE TABLE public.moneymaker_measurements (
    id integer DEFAULT nextval('public.moneymaker_measurement_id_seq'::regclass) NOT NULL,
    name text,
    status text,
    entity text,
    cost text,
    has_key text,
    stock_or_flow text,
    attributes text,
    fee text,
    process_order integer
);

ALTER TABLE public.moneymaker_measurements OWNER TO freerad2_special;
