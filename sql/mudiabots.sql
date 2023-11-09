CREATE SEQUENCE public.mudiabots_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.mudiabots_id_seq OWNER TO freerad2_special;

CREATE TABLE public.mudiabots (
    id integer DEFAULT nextval('public.mudiabots_id_seq'::regclass) NOT NULL,
    name text NOT NULL DEFAULT '',
    description text NOT NULL DEFAULT '',
    img_url text NOT NULL DEFAULT '',
    status text NOT NULL DEFAULT '',
    sort text NOT NULL DEFAULT '',
    prompt text NOT NULL DEFAULT '',
    response_synthetic text NOT NULL DEFAULT '',
    response_chatgpt text NOT NULL DEFAULT '',
    response_mudiabot text NOT NULL DEFAULT '',
    domains_tli character(3) NOT NULL
);

ALTER TABLE public.mudiabots OWNER TO freerad2_special;

ALTER TABLE ONLY public.mudiabots
    ADD CONSTRAINT mudiabots_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.mudiabots
    ADD CONSTRAINT mudiabots_prompt_unique UNIQUE (prompt);
