CREATE SEQUENCE public.ux_storyboards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_storyboards_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_storyboards (
    id integer DEFAULT nextval('public.ux_storyboards_id_seq'::regclass) NOT NULL,
    situation_user_encounters text NOT NULL DEFAULT '',
    user_desires text NOT NULL DEFAULT '',
    user_utilizes_product text NOT NULL DEFAULT '',
    situation_resolution text NOT NULL DEFAULT '',
    url text NOT NULL DEFAULT '',
    prompts_id integer NOT NULL
);

ALTER TABLE public.ux_storyboards OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_storyboards
    ADD CONSTRAINT ux_storyboards_pk PRIMARY KEY (id);
