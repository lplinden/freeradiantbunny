CREATE SEQUENCE public.ux_low_fidelity_prototypes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_low_fidelity_prototypes_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_low_fidelity_prototypes (
    id integer DEFAULT nextval('public.ux_low_fidelity_prototypes_id_seq'::regclass) NOT NULL,
     array_of_urls text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_low_fidelity_prototypes OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_low_fidelity_prototypes
    ADD CONSTRAINT ux_low_fidelity_prototypes_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_low_fidelity_prototypes
    ADD CONSTRAINT ux_low_fidelity_prototypes_prompts_id_unique UNIQUE (prompts_id);
