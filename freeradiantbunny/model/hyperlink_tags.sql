CREATE SEQUENCE public.hyperlink_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 2;

ALTER TABLE public.hyperlink_tag_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlink_tags (
    id integer DEFAULT nextval('public.hyperlink_tag_id_seq'::regclass) NOT NULL,
    hyperlink_id integer NOT NULL,
    tag_id integer NOT NULL
);

ALTER TABLE public.hyperlink_tags OWNER TO freerad2_special;
