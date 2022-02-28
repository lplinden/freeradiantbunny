CREATE SEQUENCE public.journal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.journal_id_seq OWNER TO freerad2_special;

CREATE TABLE public.journals (
    id integer DEFAULT nextval('public.journal_id_seq'::regclass) NOT NULL,
    name text
);

ALTER TABLE public.journals OWNER TO freerad2_special;
