CREATE SEQUENCE public.reason_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.reason_id_seq OWNER TO freerad2_special;



CREATE TABLE public.reasons (
    id integer DEFAULT nextval('public.reason_id_seq'::regclass) NOT NULL,
    name character varying(60),
    img_url text,
    description text,
    orderby integer
);

ALTER TABLE public.reasons OWNER TO freerad2_special;
