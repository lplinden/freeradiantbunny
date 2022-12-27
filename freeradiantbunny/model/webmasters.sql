CREATE SEQUENCE public.webmasters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.webmasters_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webmasters (
    id integer DEFAULT nextval('public.webmasters_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    username text
);

ALTER TABLE public.webmasters OWNER TO freerad2_special;

ALTER TABLE ONLY public.webmasters
    ADD CONSTRAINT webmasters_pk PRIMARY KEY (id);
