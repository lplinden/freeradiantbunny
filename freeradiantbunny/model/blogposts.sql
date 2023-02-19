CREATE SEQUENCE public.blogposts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.blogposts_id_seq OWNER TO freerad2_special;

CREATE TABLE public.blogposts (
    id integer DEFAULT nextval('public.blogposts_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    webpages_id integer,
    body text,
    tags text,
    url_alias text,
    author text,
    pubdate text,
    database_string text,
    class_name_string text,
    class_primary_key_string text
);

ALTER TABLE public.blogposts OWNER TO freerad2_special;

ALTER TABLE ONLY public.blogposts
    ADD CONSTRAINT blogposts_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.blogposts
    ADD CONSTRAINT blogposts_webpages_id_fk FOREIGN KEY (webpages_id) REFERENCES public.webpages(id);
