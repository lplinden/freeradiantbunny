CREATE TABLE public.budget_accounts (
    budget_id integer NOT NULL,
    account_id integer NOT NULL,
    id integer
);


ALTER TABLE public.budget_accounts OWNER TO freerad2_special;

ALTER TABLE ONLY public.budget_accounts
    ADD CONSTRAINT budget_account_id_pkey PRIMARY KEY (id);
    
