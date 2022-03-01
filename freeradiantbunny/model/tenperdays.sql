CREATE SEQUENCE public.tenperday_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.tenperday_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tenperdays (
    id integer DEFAULT nextval('public.tenperday_id_seq'::regclass) NOT NULL,
    count text,
    sort text NOT NULL
);

ALTER TABLE public.tenperdays OWNER TO freerad2_special;
