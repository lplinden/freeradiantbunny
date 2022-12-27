CREATE SEQUENCE public.hyperlink_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.hyperlink_tags_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlink_tags (
    id integer DEFAULT nextval('public.hyperlink_tags_id_seq'::regclass) NOT NULL,
    hyperlink_id integer,
    tag_id integer
);

ALTER TABLE public.hyperlink_tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.hyperlink_tags
    ADD CONSTRAINT hyperlink_tags_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.hyperlink_tags
    ADD CONSTRAINT hyperlink_tags_hyperlink_id_fk FOREIGN KEY (hyperlink_id) REFERENCES public.hyperlinks(id);

ALTER TABLE ONLY public.hyperlink_tags
    ADD CONSTRAINT hyperlink_tags_tag_id_fk FOREIGN KEY (tag_id) REFERENCES public.tags(id);
