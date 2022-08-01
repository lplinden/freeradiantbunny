CREATE SEQUENCE public.class_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.class_tag_id_seq OWNER TO freerad2_special;

CREATE TABLE public.class_tags (
    id integer DEFAULT nextval('public.class_tag_id_seq'::regclass) NOT NULL,
    class_name text,
    id_of_given_class integer,
    tag_id integer
);

ALTER TABLE public.class_tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.class_tags
    ADD CONSTRAINT class_tag_id_pkey PRIMARY KEY (id);
