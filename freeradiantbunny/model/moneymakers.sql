CREATE SEQUENCE public.moneymakers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.moneymakers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.moneymakers (
    id integer DEFAULT nextval('public.moneymakers_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    dirt text,
    ideal_client text,
    demographics text,
    url text,
    questions text
);

ALTER TABLE public.moneymakers OWNER TO freerad2_special;

ALTER TABLE ONLY public.moneymakers
    ADD CONSTRAINT moneymakers_pk PRIMARY KEY (id);
