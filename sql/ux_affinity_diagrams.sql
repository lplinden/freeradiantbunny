CREATE SEQUENCE public.ux_affinity_diagrams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_affinity_diagrams_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_affinity_diagrams (
    id integer DEFAULT nextval('public.ux_affinity_diagrams_id_seq'::regclass) NOT NULL,
     project_aims text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_affinity_diagrams OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_affinity_diagrams
    ADD CONSTRAINT ux_affinity_diagrams_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_affinity_diagrams
    ADD CONSTRAINT ux_affinitiy_diagrams_prompts_id_unique UNIQUE (prompts_id);
