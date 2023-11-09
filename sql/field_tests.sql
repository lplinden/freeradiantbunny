CREATE SEQUENCE public.field_tests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.field_tests_id_seq OWNER TO freerad2_special;

CREATE TABLE public.field_tests (
    id integer DEFAULT nextval('public.field_tests_id_seq'::regclass) NOT NULL,
    date text,
    farmer text,
    garment text,
    farm_task text,
    field_report text
);

ALTER TABLE public.field_tests OWNER TO freerad2_special;

ALTER TABLE ONLY public.field_tests
    ADD CONSTRAINT field_tests_pk PRIMARY KEY (id);
