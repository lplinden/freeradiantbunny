CREATE SEQUENCE public.hyperlinks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.hyperlinks_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlinks (
    id integer DEFAULT nextval('public.hyperlinks_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    date character varying(10),
    alphabetical text,
    url text
);

ALTER TABLE public.hyperlinks OWNER TO freerad2_special;

ALTER TABLE ONLY public.hyperlinks
    ADD CONSTRAINT hyperlinks_pk PRIMARY KEY (id);
