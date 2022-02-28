CREATE SEQUENCE public.share_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.share_id_seq OWNER TO freerad2_special;

CREATE TABLE public.shares (
    id integer DEFAULT nextval('public.share_id_seq'::regclass) NOT NULL,
    harvest_id integer,
    owner text,
    price text
);

ALTER TABLE public.shares OWNER TO freerad2_special;
