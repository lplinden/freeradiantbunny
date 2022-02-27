CREATE SEQUENCE public.domain_measurement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.domain_measurement_id_seq OWNER TO freerad2_special;

CREATE TABLE public.domain_measurements (
    id integer DEFAULT nextval('public.domain_measurement_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    publish text
);

ALTER TABLE public.domain_measurements OWNER TO freerad2_special;

ALTER TABLE ONLY public.domain_measurements
    ADD CONSTRAINT domain_measurement_id_pkey PRIMARY KEY (id);
    
