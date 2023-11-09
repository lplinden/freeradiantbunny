CREATE SEQUENCE public.tenperdays_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.tenperdays_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tenperdays (
    id integer DEFAULT nextval('public.tenperdays_id_seq'::regclass) NOT NULL,
    sort text NOT NULL,
    count text
);

ALTER TABLE public.tenperdays OWNER TO freerad2_special;

ALTER TABLE ONLY public.tenperdays
    ADD CONSTRAINT tenperdays_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.tenperdays
    ADD CONSTRAINT tenperdays_sort_unique UNIQUE (sort);
