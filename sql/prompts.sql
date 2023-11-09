CREATE SEQUENCE public.prompts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.prompts_id_seq OWNER TO freerad2_special;

CREATE TABLE public.prompts (
    id integer DEFAULT nextval('public.prompts_id_seq'::regclass) NOT NULL,
    description text NOT NULL,
    name text NOT NULL,
    sort text NOT NULL,
    img_url text NOT NULL,
    status text NOT NULL,
    prompt text NOT NULL,
    response text NOT NULL,
    finetune text NOT NULL
);

ALTER TABLE public.prompts OWNER TO freerad2_special;

ALTER TABLE ONLY public.prompts
    ADD CONSTRAINT prompts_pk PRIMARY KEY (id);

