CREATE SEQUENCE public.budget_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.budget_id_seq OWNER TO freerad2_special;

CREATE TABLE public.budgets (
    id integer DEFAULT nextval('public.budget_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    publish text,
    process_state text
);

ALTER TABLE public.budgets OWNER TO freerad2_special;

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budget_id_pkey PRIMARY KEY (id);
    
