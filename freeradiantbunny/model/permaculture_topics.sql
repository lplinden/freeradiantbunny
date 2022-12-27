CREATE TABLE public.permaculture_topics (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text
);

ALTER TABLE public.permaculture_topics OWNER TO freerad2_special;

ALTER TABLE ONLY public.permaculture_topics
    ADD CONSTRAINT permaculture_topics_pk PRIMARY KEY (id);
