CREATE SEQUENCE public.tag_instances_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.tag_instances_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tag_instances (
    id integer DEFAULT nextval('public.tag_instances_id_seq'::regclass) NOT NULL,
    tag_id integer,
    class_name_string text,
    class_primary_key_string text
);

ALTER TABLE public.tag_instances OWNER TO freerad2_special;

ALTER TABLE ONLY public.tag_instances
    ADD CONSTRAINT tag_instances_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.tag_instances
    ADD CONSTRAINT tag_instances_tag_id_fk FOREIGN KEY (tag_id) REFERENCES public.tag(id);

ALTER TABLE ONLY public.tag_instances
    ADD CONSTRAINT tag_instances_tag_id_class_name_string_class_primary_key_string_unique UNIQUE (tag_id, class_name_string, class_primary_key_string);
