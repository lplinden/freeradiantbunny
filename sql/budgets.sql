CREATE SEQUENCE public.budgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.budgets_id_seq OWNER TO freerad2_special;

CREATE TABLE public.budgets (
    id integer DEFAULT nextval('public.budgets_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    publish text,
    process_state text
);

ALTER TABLE public.budgets OWNER TO freerad2_special;

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_pk PRIMARY KEY (id);
