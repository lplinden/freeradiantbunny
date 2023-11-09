CREATE SEQUENCE public.ux_empathy_maps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_empathy_maps_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_empathy_maps (
    id integer DEFAULT nextval('public.ux_empathy_maps_id_seq'::regclass) NOT NULL,
     user_name text NOT NULL DEFAULT '',
     says text NOT NULL DEFAULT '',
     thinks text NOT NULL DEFAULT '',
     does text NOT NULL DEFAULT '',
     feels text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_empathy_maps OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_empathy_maps
    ADD CONSTRAINT ux_empathy_maps_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_empathy_maps
    ADD CONSTRAINT ux_empathy_maps_id_unique UNIQUE (prompts_id);
