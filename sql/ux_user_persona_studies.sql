CREATE SEQUENCE public.ux_user_persona_studies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_user_persona_studies_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_user_persona_studies (
    id integer DEFAULT nextval('public.ux_user_persona_studies_id_seq'::regclass) NOT NULL,
     user_portrait_url text NOT NULL DEFAULT '',
     user_name text NOT NULL DEFAULT '',	
     user_age text NOT NULL DEFAULT '',
     user_education text NOT NULL DEFAULT '',
     user_hometown text NOT NULL DEFAULT '',
     user_family text NOT NULL DEFAULT '',
     user_occupation text NOT NULL DEFAULT '',
     user_quote text NOT NULL DEFAULT '',
     user_goals text NOT NULL DEFAULT '',
     user_frustrations text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_user_persona_studies OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_user_persona_studies
    ADD CONSTRAINT ux_user_persona_studies_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_user_persona_studies
    ADD CONSTRAINT u_user_persona_studies_prompts_id_unique UNIQUE (prompts_id);
