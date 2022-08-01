CREATE SEQUENCE public.classes_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.classes_tag_id_seq OWNER TO freerad2_special;

CREATE TABLE public.classes_tags (
    id integer DEFAULT nextval('public.classes_tag_id_seq'::regclass) NOT NULL,
    class_name text,
    ig_of_given_class integer,
    tag_id integer
);

ALTER TABLE public.classes_tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.classes_tags
    ADD CONSTRAINT classes_tag_id_pk PRIMARY KEY (id);
