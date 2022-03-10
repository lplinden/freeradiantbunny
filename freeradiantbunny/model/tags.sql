CREATE SEQUENCE public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.tag_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tags (
    id integer DEFAULT nextval('public.tag_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    permaculture_topic_id integer,
    alias text,
    url text
);

ALTER TABLE public.tags OWNER TO freerad2_special;

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tag_id_pkey PRIMARY KEY (id);
