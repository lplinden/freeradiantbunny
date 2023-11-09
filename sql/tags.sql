CREATE SEQUENCE public.tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.tags_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tags (
    id integer DEFAULT nextval('public.tags_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    permaculture_topics_id integer,
    alias text,
    url text
);

ALTER TABLE public.tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_permaculture_topics_id_fk FOREIGN KEY (permaculture_topics_id) REFERENCES public.permaculture_topics(id);
