CREATE SEQUENCE public.stories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;
ALTER SEQUENCE public.stories_id_seq OWNER TO freerad2_special;
CREATE TABLE public.stories (
    id integer DEFAULT nextval('public.stories_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    num INTEGER,
    about TEXT,
    date TEXT,
    log TEXT,
    url VARCHAR(255),
    approved boolean
);
ALTER TABLE public.stories OWNER TO freerad2_special;
ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pk PRIMARY KEY (id);
    
