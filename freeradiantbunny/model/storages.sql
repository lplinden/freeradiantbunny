CREATE SEQUENCE public.storage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.storage_id_seq OWNER TO freerad2_special;

CREATE TABLE public.storages (
    id integer DEFAULT nextval('public.storage_id_seq'::regclass) NOT NULL,
    plant_id integer,
    instructions text,
    source text
);

ALTER TABLE public.storages OWNER TO freerad2_special;
