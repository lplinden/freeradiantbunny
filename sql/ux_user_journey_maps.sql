CREATE SEQUENCE public.ux_user_journey_maps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_user_journey_maps_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_user_journey_maps (
    id integer DEFAULT nextval('public.ux_user_journey_maps_id_seq'::regclass) NOT NULL,
     user_action_1 text NOT NULL DEFAULT '',
     user_action_2 text NOT NULL DEFAULT '',
     user_action_3 text NOT NULL DEFAULT '',
     user_action_4 text NOT NULL DEFAULT '',
     user_action_5 text NOT NULL DEFAULT '',
     user_action_6 text NOT NULL DEFAULT '',
     user_action_7 text NOT NULL DEFAULT '',
     user_action_8 text NOT NULL DEFAULT '',
     url text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_user_journey_maps OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_user_journey_maps
    ADD CONSTRAINT ux_user_journey_maps_pk PRIMARY KEY (id);
