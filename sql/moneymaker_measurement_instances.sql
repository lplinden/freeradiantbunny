CREATE SEQUENCE public.moneymaker_measurement_instance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.moneymaker_measurement_instance_id_seq OWNER TO freerad2_special;

CREATE TABLE public.moneymaker_measurement_instances (
    id integer DEFAULT nextval('public.moneymaker_measurement_instance_id_seq'::regclass) NOT NULL,
    name text,
    status text,
    sort text,
    moneymaker_measurement_id integer,
    project_name text,
    ts text,
    address text,
    txn_hash text,
    fee text,
    output text,
    input text,
    measure text
);

ALTER TABLE public.moneymaker_measurement_instances OWNER TO freerad2_special;
