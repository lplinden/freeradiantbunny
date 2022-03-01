CREATE TABLE public.permaculture_topic_tags (
    id integer NOT NULL,
    permaculture_topic_id integer,
    tag_id integer
);


ALTER TABLE public.permaculture_topic_tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.permaculture_topic_tags
    ADD CONSTRAINT permaculture_topic_tag_id_pkey PRIMARY KEY (id);
