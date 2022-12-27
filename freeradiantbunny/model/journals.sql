CREATE SEQUENCE public.journals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.journals_id_seq OWNER TO freerad2_special;

CREATE TABLE public.journals (
    id integer DEFAULT nextval('public.journals_id_seq'::regclass) NOT NULL,
    name text NOT NULL
);

ALTER TABLE public.journals OWNER TO freerad2_special;

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT journals_pk PRIMARY KEY (id);
