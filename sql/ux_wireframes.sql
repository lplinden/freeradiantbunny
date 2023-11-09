CREATE SEQUENCE public.ux_wireframes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_wireframes_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_wireframes (
    id integer DEFAULT nextval('public.ux_wireframes_id_seq'::regclass) NOT NULL,
     url_of_set text NOT NULL DEFAULT '',
     array_of_urls_of_individuals text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_wireframes OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_wireframes
    ADD CONSTRAINT ux_wireframes_pk PRIMARY KEY (id);
