CREATE SEQUENCE public.hyperlink_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.hyperlink_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlinks (
    id integer DEFAULT nextval('public.hyperlink_id_seq'::regclass) NOT NULL,
    date character varying(10),
    url text,
    name text,
    description text,
    alphabetical text,
    img_url text
);

ALTER TABLE public.hyperlinks OWNER TO freerad2_special;
