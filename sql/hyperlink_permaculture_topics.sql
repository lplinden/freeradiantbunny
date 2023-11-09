CREATE SEQUENCE public.hyperlink_permaculture_topics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.hyperlink_permaculture_topics_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlink_permaculture_topics (
    id integer DEFAULT nextval('public.hyperlink_permaculture_topics_id_seq'::regclass) NOT NULL,
    hyperlink_id integer NOT NULL,
    permaculture_topic_id integer NOT NULL
);

ALTER TABLE public.hyperlink_permaculture_topics OWNER TO freerad2_special;

ALTER TABLE ONLY public.hyperlink_permaculture_topics
    ADD CONSTRAINT hyperlink_permaculture_topics_pk PRIMARY KEY (id);
    
ALTER TABLE ONLY public.hyperlink_permaculture_topics	 
    ADD CONSTRAINT hyperlink_permaculture_topics_permaculture_topic_id_fk FOREIGN KEY (permaculture_topic_id) REFERENCES public.permaculture_topics(id);

ALTER TABLE ONLY public.hyperlink_permaculture_topics	 
    ADD CONSTRAINT hyperlink_permaculture_topics_hyperlink_id_fk FOREIGN KEY (hyperlink_id) REFERENCES public.hyperlinks(id);

