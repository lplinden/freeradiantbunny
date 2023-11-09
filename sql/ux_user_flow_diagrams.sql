CREATE SEQUENCE public.ux_user_flow_diagrams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_user_flow_diagrams_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_user_flow_diagrams (
    id integer DEFAULT nextval('public.ux_user_flow_diagrams_id_seq'::regclass) NOT NULL,
     description_of_shapes text NOT NULL DEFAULT '',
     url text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_user_flow_diagrams OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_user_flow_diagrams
    ADD CONSTRAINT ux_user_flow_diagrams_pk PRIMARY KEY (id);
