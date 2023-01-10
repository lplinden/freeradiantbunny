CREATE SEQUENCE public.permaculture_topic_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.permaculture_topic_tags_id_seq OWNER TO freerad2_special;

CREATE TABLE public.permaculture_topic_tags (
    id integer DEFAULT nextval('public.permaculture_topic_tags_id_seq'::regclass) NOT NULL,
    permaculture_topics_id integer,
    tags_id integer
);

ALTER TABLE public.permaculture_topic_tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.permaculture_topic_tags
    ADD CONSTRAINT permaculture_topic_tags_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.permaculture_topic_tags
    ADD CONSTRAINT permaculture_topic_tags_permaculture_topics_id_fk FOREIGN KEY (permaculture_topics_id) REFERENCES public.permaculture_topics(id);

ALTER TABLE ONLY public.permaculture_topic_tags
    ADD CONSTRAINT permaculture_topic_tags_tags_id_fk FOREIGN KEY (tags_id) REFERENCES public.tags(id);
