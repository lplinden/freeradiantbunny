-- version 0.0.5
CREATE SEQUENCE public.maxonomies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.maxonomies_id_seq OWNER TO freerad2_special;

CREATE TABLE public.maxonomies (
    id integer DEFAULT nextval('public.maxonomies_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    img_url text NOT NULL,
    status text NOT NULL,
    sort text NOT NULL,
    description text NOT NULL,
    url text NOT NULL
);

ALTER TABLE public.maxonomies OWNER TO freerad2_special;

ALTER TABLE ONLY public.maxonomies
    ADD CONSTRAINT maxonomies_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.maxonomies
    ADD CONSTRAINT maxonomies_name_unique UNIQUE (name);
    
SELECT pg_catalog.setval('public.maxonomies_id_seq', 200, true);
