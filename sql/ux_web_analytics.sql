CREATE SEQUENCE public.ux_web_analytics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_web_analytics_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_web_analytics (
    id integer DEFAULT nextval('public.ux_web_analytics_id_seq'::regclass) NOT NULL,
     project_aims text NOT NULL DEFAULT '',
     actions_user_takes text NOT NULL DEFAULT '',
     target_audience text NOT NULL DEFAULT '',
     positive_impact text NOT NULL DEFAULT '',
     success_measurements text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_web_analytics OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_web_analytics
    ADD CONSTRAINT ux_web_analytics_pk PRIMARY KEY (id);
