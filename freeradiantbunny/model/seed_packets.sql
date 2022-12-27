CREATE SEQUENCE public.seed_packets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.seed_packets_id_seq OWNER TO freerad2_special;

CREATE TABLE public.seed_packets (
    id integer DEFAULT nextval('public.seed_packets_id_seq'::regclass) NOT NULL,
    variety_id integer,
    supplier_id integer,
    packed_for_year text,
    contents text,
    sow_instructions text,
    days_to_maturity integer,
    days_to_germination text,
    notes text,
    product_details text,
    status text,
    url text
);

ALTER TABLE public.seed_packets OWNER TO freerad2_special;

ALTER TABLE ONLY public.seed_packets
    ADD CONSTRAINT seed_packets_pk PRIMARY KEY (id);
