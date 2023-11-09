CREATE SEQUENCE public.ux_information_architectures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_information_architectures_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_information_architectures (
    id integer DEFAULT nextval('public.ux_information_architectures_id_seq'::regclass) NOT NULL,
     url text NOT NULL DEFAULT '',
     navigation_main text NOT NULL DEFAULT '',
     navigation_secondary text NOT NULL DEFAULT '',
     content_pages_basic_layout text NOT NULL DEFAULT '',
     interactive_elements text NOT NULL DEFAULT '',
     search_Functionality text NOT NULL DEFAULT '',
     error_pages text NOT NULL DEFAULT '',
     user_roles_and_permissions text NOT NULL DEFAULT '',
     contact_information text NOT NULL DEFAULT '',
     legal_and_compliance_pages text NOT NULL DEFAULT '',
     prompts_id integer NOT NULL
);

ALTER TABLE public.ux_information_architectures OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_information_architectures
    ADD CONSTRAINT ux_information_architectures_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_information_architectures
    ADD CONSTRAINT ux_information_architectures_prompts_id_unique UNIQUE (prompts_id);
