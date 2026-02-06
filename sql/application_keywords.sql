CREATE SEQUENCE public.application_keywords_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.application_keywords_id_seq OWNER TO freerad2_special;

CREATE TABLE public.application_keywords (
    id integer DEFAULT nextval('public.application_keywords_id_seq'::regclass) NOT NULL,
    applications_id integer,
    keywords_id integer
);

ALTER TABLE public.application_keywords OWNER TO freerad2_special;

ALTER TABLE ONLY public.application_keywords
    ADD CONSTRAINT application_keywords_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.application_keywords
    ADD CONSTRAINT application_keywords_applications_id_fk FOREIGN KEY (applications_id) REFERENCES public.applications(id);

ALTER TABLE ONLY public.application_keywords
    ADD CONSTRAINT application_keywords_keywords_id_fk FOREIGN KEY (keywords_id) REFERENCES public.keywords(id);
