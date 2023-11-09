CREATE SEQUENCE public.ux_problem_statements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ux_problem_statements_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ux_problem_statements (
    id integer DEFAULT nextval('public.ux_problem_statements_id_seq'::regclass) NOT NULL,
    user_name text NOT NULL DEFAULT '',
    user_characteristics text NOT NULL DEFAULT '',
    user_need text NOT NULL DEFAULT '',
    insight text NOT NULL DEFAULT '',
    prompts_id integer NOT NULL
);

ALTER TABLE public.ux_problem_statements OWNER TO freerad2_special;

ALTER TABLE ONLY public.ux_problem_statements
    ADD CONSTRAINT ux_problem_statements_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ux_problem_statements
    ADD CONSTRAINT ux_problem_statements_prompts_id_unique UNIQUE (prompts_id);
