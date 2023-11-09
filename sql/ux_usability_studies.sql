CREATE SEQUENCE public.ux_usability_studies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_usability_studies_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_usability_studies (
    id integer DEFAULT nextval('public.ux_usability_studies_id_seq'::regclass) NOT NULL,
     test text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_usability_studies OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_usability_studies
    ADD CONSTRAINT ux_usability_studies_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_usability_studies
    ADD CONSTRAINT ux_usability_studies_prompts_id_unique UNIQUE (prompts_id);

