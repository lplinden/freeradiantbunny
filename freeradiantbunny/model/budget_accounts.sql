CREATE SEQUENCE public.budget_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.budget_accounts_id_seq OWNER TO freerad2_special;

CREATE TABLE public.budget_accounts (
    id integer DEFAULT nextval('public.machines_id_seq'::regclass) NOT NULL,
    budget_id integer NOT NULL,
    account_id integer NOT NULL
);

ALTER TABLE public.budget_accounts OWNER TO freerad2_special;

ALTER TABLE ONLY public.budget_accounts
    ADD CONSTRAINT budget_accounts_pk PRIMARY KEY (id);
