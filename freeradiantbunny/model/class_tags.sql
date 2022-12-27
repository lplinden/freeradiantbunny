CREATE SEQUENCE public.class_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.class_tags_id_seq OWNER TO freerad2_special;

CREATE TABLE public.class_tags (
    id integer DEFAULT nextval('public.class_tags_id_seq'::regclass) NOT NULL,
    class_name text,
    class_id integer,
    tag_id integer
);

ALTER TABLE public.class_tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.class_tags
    ADD CONSTRAINT class_tags_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.class_tags
    ADD CONSTRAINT class_tags_tag_id_fk FOREIGN KEY (tag_id) REFERENCES public.tags(id);
