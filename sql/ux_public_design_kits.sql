CREATE SEQUENCE public.ux_public_design_kits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_public_design_kits_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_public_design_kits (
     id integer DEFAULT nextval('public.ux_public_design_kits_id_seq'::regclass) NOT NULL,
     usage_description text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_public_design_kits OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_public_design_kits
    ADD CONSTRAINT ux_public_design_kits_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_public_design_kits
    ADD CONSTRAINT ux_public_design_kits_prompts_id_unique UNIQUE (prompts_id);
