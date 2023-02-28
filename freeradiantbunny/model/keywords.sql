CREATE SEQUENCE public.keywords_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.keywords_id_seq OWNER TO freerad2_special;

CREATE TABLE public.keywords (
    id integer DEFAULT nextval('public.keywords_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    url text
);

ALTER TABLE public.keywords OWNER TO freerad2_special;

ALTER TABLE ONLY public.keywords
    ADD CONSTRAINT keywords_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.keywords
    ADD CONSTRAINT keywords_name_unique UNIQUE (name);
