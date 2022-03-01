CREATE SEQUENCE public.webpage_maxonomy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.webpage_maxonomy_id_seq OWNER TO freerad2_special;

    

CREATE TABLE public.webpage_maxonomies (
    id integer DEFAULT nextval('public.webpage_maxonomy_id_seq'::regclass) NOT NULL,
    webpage_id integer,
    maxonomy_id integer
);

ALTER TABLE public.webpage_maxonomies OWNER TO freerad2_special;
