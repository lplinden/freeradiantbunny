CREATE SEQUENCE public.soil_tests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.soil_tests_id_seq OWNER TO freerad2_special;

CREATE TABLE public.soil_tests (
    id integer DEFAULT nextval('public.soil_tests_id_seq'::regclass) NOT NULL,
    name text
);

ALTER TABLE public.soil_tests OWNER TO freerad2_special;

ALTER TABLE ONLY public.soil_tests
    ADD CONSTRAINT soil_tests_pk PRIMARY KEY (id);
