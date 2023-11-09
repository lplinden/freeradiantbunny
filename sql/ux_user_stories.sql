CREATE SEQUENCE public.ux_user_stories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_user_stories_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_user_stories (
    id integer DEFAULT nextval('public.ux_user_stories_id_seq'::regclass) NOT NULL,
     type_of_user text NOT NULL DEFAULT '',
     to_action text NOT NULL DEFAULT '',
     benefits text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_user_stories OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_user_stories
    ADD CONSTRAINT ux_user_stories_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_user_stories
    ADD CONSTRAINT ux_user_stories_id_unique UNIQUE (prompts_id);
    
