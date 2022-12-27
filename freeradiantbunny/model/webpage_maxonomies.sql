CREATE SEQUENCE public.webpage_maxonomies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.webpage_maxonomies_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webpage_maxonomies (
    id integer DEFAULT nextval('public.webpage_maxonomies_id_seq'::regclass) NOT NULL,
    webpage_id integer,
    maxonomy_id integer
);

ALTER TABLE public.webpage_maxonomies OWNER TO freerad2_special;

ALTER TABLE ONLY public.webpage_maxonomies
    ADD CONSTRAINT webpage_maxonomies_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.webpage_maxonomies
    ADD CONSTRAINT webpage_maxonomies_webpage_id_fk FOREIGN KEY (webpage_id) REFERENCES public.webpages(id);

ALTER TABLE ONLY public.webpage_maxonomies
    ADD CONSTRAINT webpage_maxonomies_maxonomy_id_fk FOREIGN KEY (maxonomy_id) REFERENCES public.maxonomies(id);
