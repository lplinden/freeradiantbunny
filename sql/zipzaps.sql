CREATE SEQUENCE public.zipzaps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.zipzaps_id_seq OWNER TO freerad2_special;

CREATE TABLE public.zipzaps (
    id integer DEFAULT nextval('public.zipzaps_id_seq'::regclass) NOT NULL,
    name text,
    sort text,
    details text,
    igname text
);

ALTER TABLE public.zipzaps OWNER TO freerad2_special;

ALTER TABLE ONLY public.zipzaps
    ADD CONSTRAINT zipzaps_pk PRIMARY KEY (id);
