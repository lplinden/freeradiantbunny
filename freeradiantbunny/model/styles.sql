CREATE SEQUENCE public.style_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.style_id_seq OWNER TO freerad2_special;

CREATE TABLE public.styles (
    id integer DEFAULT nextval('public.style_id_seq'::regclass) NOT NULL,
    number character varying(5),
    description text,
    url text,
    season character varying(4),
    color_id integer,
    puppy boolean,
    owner text
);

ALTER TABLE public.styles OWNER TO freerad2_special;
