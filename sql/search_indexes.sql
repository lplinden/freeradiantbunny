CREATE SEQUENCE public.search_indexes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.search_indexes_id_seq OWNER TO freerad2_special;

CREATE TABLE public.search_indexes (
    id integer DEFAULT nextval('public.search_indexes_id_seq'::regclass) NOT NULL,
    name text,
    class_name_string text,
    class_primary_key_string text
);

ALTER TABLE public.search_indexes OWNER TO freerad2_special;

ALTER TABLE ONLY public.search_indexes
    ADD CONSTRAINT search_indexes_pk PRIMARY KEY (id);
