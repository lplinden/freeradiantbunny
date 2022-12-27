CREATE SEQUENCE public.webpage_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.webpage_tags_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webpage_tags (
    id integer DEFAULT nextval('public.webpage_tags_id_seq'::regclass) NOT NULL,
    webpage_id integer,
    tag_id integer
);

ALTER TABLE public.webpage_tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.webpage_tags
    ADD CONSTRAINT webpage_tags_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.webpage_tags
    ADD CONSTRAINT webpage_tags_webpage_id_fk FOREIGN KEY (webpage_id) REFERENCES public.webpages(id);

ALTER TABLE ONLY public.webpage_tags
    ADD CONSTRAINT webpage_tags_tag_id_fk FOREIGN KEY (tag_id) REFERENCES public.tags(id);
