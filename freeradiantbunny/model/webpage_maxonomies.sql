CREATE SEQUENCE public.webpage_maxonomies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.webpage_maxonomies_id_seq OWNER TO freerad2_special;

CREATE TABLE public.webpage_maxonomies (
    id integer DEFAULT nextval('public.webpage_maxonomies_id_seq'::regclass) NOT NULL,
    webpages_id integer,
    maxonomies_id integer
);

ALTER TABLE public.webpage_maxonomies OWNER TO freerad2_special;

ALTER TABLE ONLY public.webpage_maxonomies
    ADD CONSTRAINT webpage_maxonomies_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.webpage_maxonomies
    ADD CONSTRAINT webpage_maxonomies_webpages_id_fk FOREIGN KEY (webpages_id) REFERENCES public.webpages(id);

ALTER TABLE ONLY public.webpage_maxonomies
    ADD CONSTRAINT webpage_maxonomies_maxonomies_id_fk FOREIGN KEY (maxonomies_id) REFERENCES public.maxonomies(id);
