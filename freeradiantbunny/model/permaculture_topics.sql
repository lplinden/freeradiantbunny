CREATE TABLE public.permaculture_topics (
    id integer NOT NULL,
    name text,
    description text,
    status text,
    sort text,
    img_url text
);

ALTER TABLE public.permaculture_topics OWNER TO freerad2_special;

ALTER TABLE ONLY public.permaculture_topics
    ADD CONSTRAINT permaculture_topic_id_pkey PRIMARY KEY (id);
