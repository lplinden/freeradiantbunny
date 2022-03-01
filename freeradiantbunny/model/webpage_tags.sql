CREATE SEQUENCE public.webpage_tag_id_seq
    START WITH 14
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.webpage_tag_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webpage_tags (
    id integer NOT NULL,
    webpage_id integer NOT NULL,
    tag_id integer NOT NULL
);

ALTER TABLE public.webpage_tags OWNER TO freerad2_special;
