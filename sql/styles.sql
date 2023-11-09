CREATE SEQUENCE public.styles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.styles_id_seq OWNER TO freerad2_special;

CREATE TABLE public.styles (
    id integer DEFAULT nextval('public.styles_id_seq'::regclass) NOT NULL,
    number character varying(5),
    description text,
    url text,
    season character varying(4),
    color_id integer,
    puppy boolean,
    owner text
);

ALTER TABLE public.styles OWNER TO freerad2_special;

ALTER TABLE ONLY public.styles
    ADD CONSTRAINT styles_pk PRIMARY KEY (id);
