CREATE SEQUENCE public.webmaster_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.webmaster_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webmasters (
    id integer DEFAULT nextval('public.webmaster_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    user_name text
);

ALTER TABLE public.webmasters OWNER TO freerad2_special;
